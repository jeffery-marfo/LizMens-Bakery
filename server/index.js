/**
 * Paystack Webhook Server with Supabase & Nodemailer
 */

import 'dotenv/config';
import express from 'express';
import crypto from 'crypto';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());

// --- Supabase Setup ---
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('ERROR: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// --- Nodemailer Setup ---
// NOTE: For Gmail, use an App Password if 2FA is on.
// If using a different provider, update `service` and `auth`.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Add this to .env later if needed, or hardcode for testing
    pass: process.env.EMAIL_PASS, // Add this to .env later
  },
});

// Use raw body for signature verification
app.use(
  '/webhooks/paystack',
  express.raw({ type: 'application/json' })
);
app.use(express.json());

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

function verifyPaystackSignature(payload, signature) {
  if (!PAYSTACK_SECRET_KEY) return false;
  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(payload)
    .digest('hex');
  return hash === signature;
}

app.post('/webhooks/paystack', async (req, res) => {
  res.status(200).send(); // Always respond 200 OK quickly

  const signature = req.headers['x-paystack-signature'];
  if (!signature) return;

  const rawBody = req.body;
  if (!rawBody) return;

  const payload = Buffer.isBuffer(rawBody) ? rawBody.toString('utf8') : String(rawBody);
  if (!verifyPaystackSignature(payload, signature)) {
    console.warn('[Paystack Webhook] Invalid signature');
    return;
  }

  let event;
  try {
    event = JSON.parse(payload);
  } catch (e) {
    return;
  }

  if (event.event === 'charge.success') {
    const { reference, amount, metadata, customer } = event.data;
    const amountGHS = amount / 100;

    console.log(`[Payment Success] Ref: ${reference}, Amount: ${amountGHS}`);

    // 1. Save to Supabase
    const { error } = await supabase.from('orders').insert({
      reference: reference,
      customer: {
        email: customer.email,
        name: metadata?.custom_fields?.find(f => f.variable_name === 'customer_name')?.value,
        phone: metadata?.custom_fields?.find(f => f.variable_name === 'phone_number')?.value,
      },
      items: JSON.parse(metadata?.custom_fields?.find(f => f.variable_name === 'order_items')?.value || '[]'),
      total_amount: amountGHS,
      status: 'new',
      delivery_info: {
        notes: metadata?.custom_fields?.find(f => f.variable_name === 'order_notes')?.value
      }
    });

    if (error) {
      console.error('[Supabase Error]', error);
    } else {
      console.log('[Supabase] Order saved successfully');
    }

    // 2. Send Email Notification (Optional - requires EMAIL_USER/PASS in .env)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      // Send email logic here...
      console.log('[Email] Sending notification...');
      // Implementation hidden until credentials are set
    }
  }
});

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'paystack-webhook-supabase' });
});

app.listen(PORT, () => {
  console.log(`Webhook server running on http://localhost:${PORT}`);
});
