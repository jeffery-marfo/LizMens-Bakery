# EmailJS Setup Guide

EmailJS allows you to send emails directly from your frontend without a backend. It's free for up to 200 emails per month.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create an Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Copy the Service ID** (you'll need this)

## Step 3: Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use the following template variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{phone}}` - Sender's phone number
   - `{{subject}}` - Message subject
   - `{{message}}` - Message content
   - `{{to_name}}` - Your business name

4. Example template:
   ```
   Subject: New Contact Form Submission - {{subject}}
   
   From: {{from_name}} ({{from_email}})
   Phone: {{phone}}
   
   Message:
   {{message}}
   ```

5. **Copy the Template ID** (you'll need this)

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (also called API Key)
3. **Copy the Public Key**

## Step 5: Add to .env File

Add these three variables to your `.env` file:

```env
# EmailJS Configuration
# Get these from: https://www.emailjs.com/
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Step 6: Restart Your Dev Server

After adding the environment variables, restart your development server:

```bash
npm run dev
```

## Testing

1. Fill out the contact form on your website
2. Submit the form
3. Check your email inbox - you should receive the message!

## Troubleshooting

- **"EmailJS not configured" message**: Make sure all three environment variables are set in your `.env` file
- **Emails not sending**: Check that your email service is properly connected in EmailJS dashboard
- **Template errors**: Make sure all template variables match exactly (case-sensitive)

## Free Tier Limits

- 200 emails per month (free tier)
- Upgrade available if you need more

## Alternative: Keep Using localStorage

If you don't want to set up EmailJS right now, the form will automatically save submissions to `localStorage`. You can check them in your browser's developer console:

```javascript
JSON.parse(localStorage.getItem('contactSubmissions'))
```

