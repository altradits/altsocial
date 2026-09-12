# Deployment Guide

As an AI, I cannot directly execute commands on your computer or log into your GitHub account. However, I have generated a script to do this for you.

## Step 1: Push to GitHub

1. Open your terminal (Command Prompt, PowerShell, or Terminal on Mac/Linux).
2. Navigate to the folder where you saved all these files.
3. Run the script I created for you:

**On Mac/Linux:**
```bash
chmod +x push.sh
./push.sh
```

**On Windows (Git Bash):**
```bash
bash push.sh
```

*(If it asks for your GitHub username and password, enter them. If you have 2FA enabled, you may need to use a GitHub Personal Access Token instead of your password).*

## Step 2: Deploy to Vercel

Because this application uses native ES Modules (`<script type="importmap">`) and Tailwind via CDN, it requires **no build step**. It is a pure static site.

1. Go to [Vercel.com](https://vercel.com/) and log in with your GitHub account.
2. Click **Add New...** and select **Project**.
3. Find the `altradits/altsocial` repository in the list and click **Import**.
4. In the **Configure Project** screen, use the following settings:
   - **Framework Preset:** `Other`
   - **Build Command:** *(Leave empty / toggle the override switch and ensure it is blank)*
   - **Output Directory:** *(Leave empty / toggle the override switch and ensure it is blank)*
5. Click **Deploy**.

Vercel will instantly deploy your `index.html` and associated files. Within seconds, you will get a live URL for Altradits!
