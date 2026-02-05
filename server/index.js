/**
 * Paystack Webhook Server
 *
 * Receives charge.success (and other) events from Paystack.
 * Must be run on a publicly accessible URL for Paystack to send events.
 *
 * For local testing use ngrok: ngrok http 3030
 * Then set your Paystack webhook URL to: https://your-ngrok-url.ngrok.io/webhooks/paystack
 */

import 'dotenv/config';
import express from 'express';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 3030;

// Use raw body for signature verification (Paystack signs the raw string)
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

app.post('/webhooks/paystack', (req, res) => {
  // Always respond 200 quickly so Paystack doesn't retry
  res.status(200).send();

  const signature = req.headers['x-paystack-signature'];
  if (!signature) {
    console.warn('[Paystack Webhook] Missing x-paystack-signature');
    return;
  }

  const rawBody = req.body;
  if (!rawBody || (Buffer.isBuffer(rawBody) && rawBody.length === 0) || (typeof rawBody === 'string' && !rawBody)) {
    console.warn('[Paystack Webhook] Empty body');
    return;
  }

  const payload = Buffer.isBuffer(rawBody) ? rawBody.toString('utf8') : String(rawBody);
  if (!verifyPaystackSignature(payload, signature)) {
    console.warn('[Paystack Webhook] Invalid signature');
    return;
  }

  let event;
  try {
    event = JSON.parse(payload);
  } catch (e) {
    console.warn('[Paystack Webhook] Invalid JSON', e.message);
    return;
  }

  if (event.event === 'charge.success') {
    const { reference, amount, metadata, customer } = event.data || {};
    console.log('[Paystack Webhook] charge.success', {
      reference,
      amount: amount / 100,
      email: customer?.email,
      metadata,
    });
    // Here you can:
    // - Persist the payment to your database
    // - Send confirmation email
    // - Fulfill the order (if you have a backend order store)
    // - Notify your frontend (e.g. via polling or websocket)
  } else {
    console.log('[Paystack Webhook] Event:', event.event, event.data ? 'has data' : '');
  }
});

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'paystack-webhook' });
});

app.listen(PORT, () => {
  console.log(`Paystack webhook server listening on http://localhost:${PORT}`);
  console.log(`Webhook URL: http://localhost:${PORT}/webhooks/paystack`);
  if (!PAYSTACK_SECRET_KEY) {
    console.warn('PAYSTACK_SECRET_KEY not set – signature verification will fail');
  }
});
