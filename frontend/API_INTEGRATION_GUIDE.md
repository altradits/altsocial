# Altradits: API & Backend Integration Guide

To transition Altradits from a "Local Demo" (using `localStorage`) to a fully functional SaaS that actually publishes to social media and uses AI, you need to integrate several external APIs and set up a backend. 

Here is the complete analysis of what you need, where to get it, and how to set it up.

---

## ⚠️ The Architecture Reality Check (Crucial)

Currently, your app is a **Frontend-Only (React)** application. To make this work securely, you **must build a backend** (e.g., Node.js, Firebase Cloud Functions, Python/Django). 

**Why?**
1. **Security:** You cannot store API Secret Keys (for Twitter, LinkedIn, etc.) in your React frontend code. Anyone can see them and steal them.
2. **Scheduling:** If a user schedules a post for tomorrow and closes their browser, the frontend stops running. A backend server with a "Cron Job" (scheduler) is required to wake up at the right time and send the post to the social networks.
3. **OAuth:** Connecting user accounts requires OAuth 2.0, which requires a secure backend callback URL to exchange authorization codes for access tokens.

---

## 1. Google Gemini API (For AI Image Analysis & Text Generation)
You are already using the `@google/genai` SDK in your code, but it needs a real API key to work.

*   **Where to go:** [Google AI Studio](https://aistudio.google.com/)
*   **Instructions:**
    1. Sign in with your Google account.
    2. Click **"Get API key"** in the left sidebar.
    3. Create a new API key in a new or existing Google Cloud Project.
    4. **Implementation:** In a production app, your React frontend should send the image to your *backend*, and your backend should call the Gemini API using this key. For local testing only, you can inject it into your build tool (e.g., Vite/Webpack) as `process.env.API_KEY`.

---

## 2. LinkedIn API
To publish posts to a user's LinkedIn profile or company page.

*   **Where to go:** [LinkedIn Developer Portal](https://developer.linkedin.com/)
*   **Instructions:**
    1. Click **"Create App"**. You will need to link it to a LinkedIn Company Page that you manage.
    2. Once created, go to the **"Products"** tab.
    3. Request access to **"Share on LinkedIn"** and **"Sign In with LinkedIn using OpenID Connect"**.
    4. Go to the **"Auth"** tab to get your `Client ID` and `Client Secret`.
    5. Add your backend's OAuth redirect URL (e.g., `https://yourbackend.com/auth/linkedin/callback`).
    6. **Required Scopes:** `openid`, `profile`, `email`, `w_member_social` (to post on their behalf).

---

## 3. X (Twitter) API
To publish tweets and threads.

*   **Where to go:** [X Developer Portal](https://developer.twitter.com/en/portal/dashboard)
*   **Instructions:**
    1. Sign up for a Developer Account.
    2. Create a **Project** and an **App** within that project.
    3. You can start with the **Free Tier** (allows 1,500 posts/month at the app level), but for a SaaS, you will likely need the **Basic Tier** ($100/mo).
    4. Under your App settings, set up **User authentication settings** (OAuth 2.0).
    5. Change the App permissions from "Read" to **"Read and Write"**.
    6. Get your `Client ID` and `Client Secret`.
    7. **Required Scopes:** `tweet.read`, `tweet.write`, `users.read`, `offline.access` (crucial for getting a refresh token so you can post when the user is offline).

---

## 4. Instagram Graph API
Instagram is the most complex to set up because it is tied to the Facebook ecosystem. You can only post automatically to **Instagram Professional (Business or Creator) accounts** that are linked to a Facebook Page.

*   **Where to go:** [Meta for Developers](https://developers.facebook.com/)
*   **Instructions:**
    1. Create a Developer Account and click **"Create App"**.
    2. Select **"Business"** as the app type.
    3. Add the **"Instagram Graph API"** and **"Facebook Login for Business"** products to your app.
    4. Go to App Settings > Basic to get your `App ID` and `App Secret`.
    5. **Required Scopes:** `instagram_basic`, `instagram_content_publish`, `pages_show_list`, `pages_read_engagement`.
    6. *Note:* To make this public for all users, your app will have to go through Meta's **App Review** process, which requires submitting screencasts of how your app works.

---

## 5. Backend & Database Recommendation (Firebase)
Since you need a backend to tie this all together, Firebase is the fastest way to get started for a React developer.

*   **Where to go:** [Firebase Console](https://console.firebase.google.com/)
*   **Instructions:**
    1. Create a new Firebase Project.
    2. **Authentication:** Enable Email/Password and Google Sign-in so users can create accounts on Altradits.
    3. **Firestore Database:** Create a database to store:
        *   `users` (their Altradits account info).
        *   `connections` (the encrypted OAuth Access Tokens for LinkedIn, Twitter, IG).
        *   `posts` (the drafts and scheduled posts, replacing your `localStorage`).
    4. **Cloud Functions (Node.js):** Write backend functions to:
        *   Handle the OAuth callbacks securely.
        *   Call the Gemini API securely.
        *   **Scheduling:** Use Firebase Cloud Scheduler (cron jobs) to run a function every minute. This function checks Firestore for any posts where `status == 'scheduled'` and `scheduledTime <= NOW()`, then uses the stored OAuth tokens to push the content to the respective social APIs.

## Summary Next Steps
1. Set up a Node.js/Express backend or a Firebase project.
2. Register developer accounts for LinkedIn, X, and Meta.
3. Implement OAuth 2.0 login flows for each social network on your backend.
4. Move the Gemini API call from `Dashboard.tsx` to your backend.
5. Replace `localStorage` in `Dashboard.tsx` with API calls to your new database.