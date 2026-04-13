# GoDaddy Deployment Guide for Dev26.EasaCollege.com

## 1. Prerequisites
- **cPanel Hosting** or **VPS** with GoDaddy.
- **Node.js** support enabled (If using cPanel, look for "Setup Node.js App").
- **Database**: Your MongoDB is hosted externally (Atlas), so no local database setup is needed.

## 2. Prepare Files for Upload
You need to upload the entire project **EXCLUDING** `node_modules`.

### Files/Folders to Upload:
- `backend/` (Folder)
- `dist/` (Folder - contains the built frontend)
- `server.js` (Root entry file)
- `package.json` (Root package file)
- `.env` (Create this file on the server or upload your local one)
- `public/` (If you have images in root public, though we use `backend/public`)

**Do NOT upload:**
- `node_modules/` (You will install this on the server)
- `src/` (Not needed for production, but harmless if uploaded)
- `.git/`

## 3. Deployment Steps (cPanel)

1.  **Login to cPanel**.
2.  **File Manager**:
    - Go to `public_html/dev26` (or the folder mapped to your subdomain).
    - Upload the files listed above.
3.  **Setup Node.js App**:
    - Go to **"Setup Node.js App"** in cPanel.
    - Click **"Create Application"**.
    - **Node.js Version**: Select 20.x or latest available.
    - **Application Mode**: Production.
    - **Application Root**: `/public_html/dev26` (path to your files).
    - **Application URL**: `dev26.easacollege.com`.
    - **Application Startup File**: `server.js`.
    - Click **Create**.
4.  **Install Dependencies**:
    - Once created, scroll down to the "Detected Configuration" section.
    - Click **"Run NPM Install"**. This will read `package.json` and install dependencies.
5.  **Environment Variables**:
    - Ensure your `.env` file is in `public_html/dev26/backend/.env` OR configured in the cPanel environment variables section.
    - **Important**: Your code expects `.env` in `backend/.env`. ensure you upload it there.
    - Alternatively, add variables in the "Environment Variables" section of the Node.js app page:
        - `MONGO_URI`: (Your MongoDB connection string)
        - `ADMIN_PASSWORD`: (Your admin password)
        - `JWT_SECRET`: (Your secret)
        - `AWS_ACCESS_KEY_ID`: (If used)
        - `AWS_SECRET_ACCESS_KEY`: (If used)
        - `AWS_BUCKET_NAME`: (If used)
        - `AWS_REGION`: (If used)

6.  **Restart App**:
    - Click **Restart Application**.

## 4. Troubleshooting
- **500 Error**: Check the `stderr.log` in your application root.
- **Images not loading**: Verify the `backend/public/images` permission is set to 755.
- **API Errors**: Ensure `dev26.easacollege.com/api/health` returns `{"status":"ok"}`.

## 5. Deployment (VPS / Manual)
1.  Upload files via SCP/FTP.
2.  Run `npm install`.
3.  Install PM2: `npm install -g pm2`.
4.  Start server: `pm2 start server.js --name dev26`.
5.  Setup Nginx/Apache reverse proxy to port 5000.
