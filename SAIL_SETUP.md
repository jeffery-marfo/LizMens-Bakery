# Sail Delivery Integration Setup Guide

This guide will help you set up the Sail delivery integration for your application.

## Prerequisites

1. **Sail Platform Account**: Sign up at [https://platform.sailrides.co](https://platform.sailrides.co)
2. **API Key**: Create an API key from your Sail Platform dashboard
3. **Provider Connections**: Connect at least one delivery provider (Bolt, Uber, or Yango) in your Sail dashboard

## Environment Variables

Add the following to your `.env` file:

```env
# Sail API Key (required)
VITE_SAIL_API_KEY=sail_prod_your_api_key_here

# Google Maps API Key (optional, for better geocoding)
# Get one from: https://console.cloud.google.com/apis/credentials
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

## Setup Steps

### 1. Get Your Sail API Key

1. Sign in to [Sail Platform](https://platform.sailrides.co)
2. Navigate to the "Getting Started" section
3. Click "Create API Key"
4. Copy your API key immediately (it won't be shown again)
5. Add it to your `.env` file as `VITE_SAIL_API_KEY`

### 2. Connect Delivery Providers

1. In your Sail Platform dashboard, go to "Provider connections"
2. Connect at least one provider:
   - **Bolt**: Connect your Bolt account
   - **Uber**: Connect your Uber account
   - **Yango**: Connect your Yango account
3. You can connect multiple providers to get quotes from all of them

### 3. Configure Pickup Location

The pickup location is set in `src/pages/Order.jsx`:

```javascript
const PICKUP_LOCATION = {
  lat: 5.584603,  // Your business latitude
  lng: -0.113488, // Your business longitude
  address: 'KAE DABI HOUSE, Teshie, Aboma', // Your business address
};
```

Update these coordinates to match your actual business location.

### 4. Geocoding Setup (Optional but Recommended)

For better address geocoding, you can use:

**Option A: Google Maps Geocoding API** (Recommended)
- Get an API key from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- Enable the Geocoding API
- Add the key to `.env` as `VITE_GOOGLE_MAPS_API_KEY`

**Option B: OpenStreetMap Nominatim** (Free, no API key)
- Already integrated as a fallback
- Rate limited but works for basic use

**Option C: Browser Geolocation**
- Users can type "current location" to use their GPS
- Requires user permission

## How It Works

1. **User enables delivery** - Toggles delivery option on
2. **Enters delivery address** - User types their address
3. **Gets quotes** - System geocodes address and requests quotes from Sail API
4. **Selects quote** - User chooses preferred delivery option (Bolt, Uber, or Yango)
5. **Completes payment** - User pays via Paystack
6. **Delivery booked** - After successful payment, delivery is automatically booked with Sail
7. **Tracking** - Delivery status can be tracked via Sail API

## API Endpoints Used

- `POST /v1/deliveries/quotes` - Get delivery quotes
- `POST /v1/deliveries` - Book a delivery
- `GET /v1/deliveries/{deliveryId}` - Track delivery status

## Testing

1. Use test mode in Sail Platform for development
2. Test with real addresses in your service area
3. Verify quotes are returned correctly
4. Test delivery booking after payment

## Troubleshooting

### "Sail API key not configured"
- Make sure `VITE_SAIL_API_KEY` is set in your `.env` file
- Restart your development server after adding the key

### "Could not find location"
- Try a more specific address
- Use "current location" to use GPS
- Check if Google Maps API key is configured (if using)

### "No quotes available"
- Check if providers are connected in Sail dashboard
- Verify pickup and destination are in service area
- Check Sail API status

### Rate Limiting
- Sail API has rate limits (100 quotes/min, 50 deliveries/min)
- Implement exponential backoff for retries
- Consider caching quotes for a short period

## Documentation

- [Sail API Documentation](https://platform.sailrides.co/docs#welcome)
- [Sail Platform Dashboard](https://platform.sailrides.co)

## Support

For issues with the Sail API, contact Sail support through their platform dashboard.

