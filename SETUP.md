# Her Highness Aesthetics — Setup & Deploy Guide

## Prerequisites
- AWS account
- Node.js 20+
- GitHub account
- Stripe account (test + live keys)

---

## 1. Generate Admin Password Hash

Run this once to create Zee's hashed password:

```bash
node -e "
const bcrypt = require('bcryptjs');
bcrypt.hash('YOUR_CHOSEN_PASSWORD', 12).then(h => console.log(h));
"
```

Copy the output — this goes in `ADMIN_PASSWORD_HASH` env var.

---

## 2. AWS Setup

### DynamoDB Tables

Create two tables in the AWS Console (or CLI):

**Table 1: `hha-bookings`**
```
Partition key: bookingId (String)
Sort key: createdAt (String)
GSI: appointmentDate-index
  Partition key: appointmentDate (String)
  Sort key: appointmentTime (String)
Billing: On-demand
```

**Table 2: `hha-blocked-dates`**
```
Partition key: date (String)
Sort key: blockType (String)
Billing: On-demand
```

### S3 Buckets

**Bucket 1: `hha-assets`** (public gallery images)
```
Region: us-east-1
Block public access: OFF for this bucket
Bucket policy (allow public read):
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::hha-assets/*"
  }]
}
CORS config:
[{
  "AllowedHeaders": ["*"],
  "AllowedMethods": ["GET"],
  "AllowedOrigins": ["*"]
}]
```

**Bucket 2: `hha-uploads`** (client brow photos — private)
```
Region: us-east-1
Block public access: ON (all)
CORS config:
[{
  "AllowedHeaders": ["*"],
  "AllowedMethods": ["PUT"],
  "AllowedOrigins": ["https://your-app.amplifyapp.com"],
  "MaxAgeSeconds": 3000
}]
Lifecycle rule: expire objects after 30 days
```

### CloudFront Distribution (for `hha-assets`)
```
Origin: hha-assets.s3.amazonaws.com
Viewer protocol: Redirect HTTP to HTTPS
Cache policy: CachingOptimized
Copy the CloudFront domain (e.g. d1234abcd.cloudfront.net)
```

### SES (Simple Email Service)
```
Region: us-east-1
1. Verify identity: hhaesthetics25@gmail.com
   (AWS sends a verification email — click the link)
2. If account is in sandbox mode, also verify the recipient email
3. To send to anyone: request production access in SES console
```

### IAM User for Amplify
```
Create IAM user: hha-amplify-app
Attach inline policy:
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["dynamodb:PutItem","dynamodb:GetItem","dynamodb:Query","dynamodb:UpdateItem","dynamodb:Scan"],
      "Resource": [
        "arn:aws:dynamodb:us-east-1:*:table/hha-bookings",
        "arn:aws:dynamodb:us-east-1:*:table/hha-bookings/index/*",
        "arn:aws:dynamodb:us-east-1:*:table/hha-blocked-dates"
      ]
    },
    {
      "Effect": "Allow",
      "Action": ["ses:SendEmail","ses:SendRawEmail"],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject"],
      "Resource": "arn:aws:s3:::hha-uploads/*"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::hha-assets/*"
    }
  ]
}
Generate Access Key → save Access Key ID + Secret
```

---

## 3. Stripe Setup

1. Go to https://dashboard.stripe.com
2. Create account (or log in)
3. Copy **Publishable key** and **Secret key** from Developers → API Keys
4. Set up webhook:
   - Developers → Webhooks → Add endpoint
   - URL: `https://your-app.amplifyapp.com/api/stripe/webhook`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy the **Webhook signing secret**

---

## 4. Environment Variables

Create `.env.local` from the example:
```bash
cp .env.local.example .env.local
```

Fill in all values:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
DYNAMODB_BOOKINGS_TABLE=hha-bookings
DYNAMODB_BLOCKED_DATES_TABLE=hha-blocked-dates
SES_FROM_EMAIL=hhaesthetics25@gmail.com
SES_REPLY_TO=hhaesthetics25@gmail.com
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
N8N_WEBHOOK_URL=https://your-n8n.com/webhook   # optional
ADMIN_EMAIL=hhaesthetics25@gmail.com
ADMIN_PASSWORD_HASH=<output from step 1>
NEXTAUTH_SECRET=<run: openssl rand -base64 32>
NEXTAUTH_URL=https://your-app.amplifyapp.com
CLOUDFRONT_DOMAIN=https://d1234abcd.cloudfront.net
S3_UPLOADS_BUCKET=hha-uploads
NEXT_PUBLIC_BUSINESS_PHONE=(346) 901-4161
NEXT_PUBLIC_BUSINESS_EMAIL=hhaesthetics25@gmail.com
```

---

## 5. GitHub + AWS Amplify Deploy

1. Push code to GitHub repo
2. AWS Console → Amplify → New App → Host web app
3. Connect GitHub → select repo → `main` branch
4. Build settings: Amplify auto-detects Next.js (uses `amplify.yml`)
5. Environment variables: Add all from step 4 in the Amplify console
6. Deploy

Your site will be live at `https://[random].amplifyapp.com`

---

## 6. Upload Real Gallery Images

Once Zee provides real photos:

```bash
# Optimize and upload to S3
aws s3 cp public/images/gallery/ s3://hha-assets/gallery/ --recursive --content-type image/jpeg

# Update the gallery paths in components to use CloudFront URLs
# e.g. https://d1234abcd.cloudfront.net/gallery/1.jpg
```

Or use the Amplify console to upload directly to S3.

---

## 7. Run Instagram Scraper (optional)

To pull existing Instagram posts as gallery images:

```bash
npm install puppeteer  # one-time
npm run scrape:instagram
```

This downloads up to 12 images from the public @herhighness__aesthetics profile.
Only run this locally (not on Amplify).

---

## 8. Test Checklist

```bash
npm run dev    # starts at http://localhost:3000
```

- [ ] Home page loads with all sections
- [ ] Book page: complete all 6 steps
  - Use Stripe test card: `4242 4242 4242 4242` | Any future date | Any CVC
- [ ] Confirmation page shows booking details
- [ ] Cancellation page works
- [ ] Contact form submits (check email)
- [ ] Admin login at `/admin/login` (use your ADMIN_EMAIL + chosen password)
- [ ] Admin dashboard shows bookings
- [ ] Admin can approve/cancel bookings
- [ ] Admin can block dates

---

## 9. Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

---

## Local Development

```bash
npm install
cp .env.local.example .env.local
# fill in .env.local
npm run dev
```

For Stripe webhooks locally, use Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
