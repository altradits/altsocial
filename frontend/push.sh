#!/bin/bash

# ==============================================================================
# ⚠️ WARNING: THIS SCRIPT MUST BE RUN ON YOUR LOCAL COMPUTER!
# The AI cannot run this for you. Open your terminal and run: bash push.sh
# ==============================================================================

echo "🚀 Initializing Git repository..."
git init

echo "📦 Adding files to staging..."
git add .

echo "💾 Committing files..."
git commit -m "Initial commit: Altradits Social Media Automation"

echo "🌿 Renaming default branch to 'main'..."
git branch -M main

echo "🔗 Linking to remote repository (https://github.com/altradits/altsocial.git)..."
# Remove origin if it already exists to prevent errors
git remote remove origin 2>/dev/null
git remote add origin https://github.com/altradits/altsocial.git

echo "⬆️ Pushing code to GitHub..."
git push -u origin main

echo "✅ Done! Your code is now on GitHub."
echo "Next step: Go to https://vercel.com/new to deploy your repository."
