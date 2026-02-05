# Paystack Webhooks Setup

Webhooks let Paystack notify your server when a payment succeeds (or other events occur), so you can update orders, send emails, or sync with a database even if the customer closes the browser before the popup callback runs.

## 1. Webhook server (included)

A small Node.js server in the `server/` folder receives Paystack events and verifies the signature.

### Install and run

1. **Create `server/.env`** with your Paystack secret key (and optional port):

   ```
   PAYSTACK_SECRET_KEY=sk_live_xxxxxxxx
   PORT=3030
   ```

   Use your **secret** key (starts with `sk_test_` or `sk_live_`). Never use the secret key in the frontend; only in this server.

2. **Install and start the server:**

   ```bash
   cd server
   npm install
   npm run dev
   ```

   The server loads variables from `server/.env`, so you don’t need to pass the key on the command line. You should see “Paystack webhook server listening…” with no “PAYSTACK_SECRET_KEY not set” warning.

- **Port:** `3030` (or set `PORT` in `.env`).
- **Webhook path:** `POST /webhooks/paystack`

### Local testing (ngrok)

Paystack can’t send webhooks to `localhost`. Expose your server with [ngrok](https://ngrok.com/):

```bash
# Terminal 1: run the webhook server (uses server/.env)
cd server && npm run dev

# Terminal 2: expose it
ngrok http 3030
```

Use the HTTPS URL ngrok gives you, e.g. `https://abc123.ngrok.io/webhooks/paystack`.

## 2. Configure Paystack Dashboard

1. Open [Paystack Dashboard → Settings → Developer](https://dashboard.paystack.com/#/settings/developer).
2. Under **Webhook URL**, set:
   - Test: `https://your-ngrok-url.ngrok.io/webhooks/paystack` (for local testing).
   - Live: `https://your-production-domain.com/webhooks/paystack`.
3. Save.

Paystack will send a test event when you save. Your server should log it and return `200 OK`.

## 3. Event: `charge.success`

When a payment succeeds, Paystack sends a `charge.success` event. The server:

1. Verifies the `x-paystack-signature` header (HMAC SHA512 of the body with your secret key).
2. Returns `200` immediately (so Paystack doesn’t retry).
3. Parses the JSON body and, for `charge.success`, logs reference, amount, and metadata.

Example payload (simplified):

```json
{
  "event": "charge.success",
  "data": {
    "reference": "EDUROM1234567890",
    "amount": 100,
    "metadata": {
      "custom_fields": [
        { "variable_name": "customer_name", "value": "..." },
        { "variable_name": "phone_number", "value": "..." }
      ]
    }
  }
}
```

You can extend `server/index.js` to:

- Store the payment in a database.
- Send a confirmation email.
- Call another API to fulfill the order.

## 4. Security

- **Signature verification:** The server only processes the event if `x-paystack-signature` matches the HMAC of the raw body with your secret key. Don’t skip this.
- **Secret key:** Set `PAYSTACK_SECRET_KEY` in the environment; never commit it.
- **HTTPS:** Use HTTPS in production so the webhook URL is secure.

## 5. Deploying the webhook server

Deploy the `server/` app to any host that can receive HTTPS POSTs (e.g. Railway, Render, Fly.io, or a VPS). Set `PAYSTACK_SECRET_KEY` and `PORT` in the environment, and set the **Webhook URL** in the Paystack dashboard to `https://your-domain.com/webhooks/paystack`.

If your main app is static (e.g. Vite build), you can run this webhook server as a separate service and keep the frontend on the same or another domain.
