# 🛑 IMPORTANT: How to Push to GitHub

**As an AI, I do not have access to your GitHub account, your passwords, or your computer's terminal. I cannot execute `git push` for you.**

To get this code into your repository at `https://github.com/altradits/altsocial.git`, you must run the commands on **your own computer**.

Follow these exact steps:

### Step 1: Download the Code
Ensure all the files from this project (like `index.html`, `App.tsx`, `package.json`, etc.) are saved in a folder on your computer. Let's assume the folder is called `altsocial`.

### Step 2: Open your Terminal
Open your Terminal (Mac/Linux) or Command Prompt / Git Bash (Windows) and navigate to that folder:
```bash
cd path/to/your/folder/altsocial
```

### Step 3: Run the Git Commands
Copy and paste the following commands into your terminal, pressing **Enter** after each one:

```bash
# 1. Initialize the repository
git init

# 2. Add all files
git add .

# 3. Commit the files
git commit -m "Initial commit: Altradits Social Media Automation"

# 4. Set the main branch
git branch -M main

# 5. Link to your GitHub repository
git remote add origin https://github.com/altradits/altsocial.git

# 6. Push the code to GitHub
git push -u origin main
```

### Troubleshooting
*   **Authentication Failed:** GitHub no longer accepts account passwords in the terminal. When prompted for a password, you must use a **Personal Access Token (PAT)**. You can generate one in your GitHub account under *Settings > Developer settings > Personal access tokens*.
*   **Remote Origin Already Exists:** If you get an error on step 5, run `git remote remove origin` and then try step 5 again.
