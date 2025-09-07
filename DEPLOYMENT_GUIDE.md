# 🚀 Free Deployment Guide - Hashtag Generator India

## 🎯 **Goal: Deploy for FREE for 1 Year**

### **What You'll Get:**
- ✅ Free hosting (Vercel)
- ✅ Free domain (your-app.vercel.app)
- ✅ Free SSL certificate
- ✅ Free database (MongoDB Atlas)
- ✅ Google AdSense ready
- ✅ No credit card required

---

## 📋 **Step 1: Create GitHub Repository**

### **Option A: Using GitHub Website**
1. Go to https://github.com
2. Click **"New repository"**
3. Repository name: `hashtag-generator-india`
4. Description: `Free Hashtag Generator for Indian Social Media`
5. Make it **Public** (required for free Vercel)
6. Click **"Create repository"**

### **Option B: Using Git Commands**
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Hashtag Generator India"

# Add remote repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/hashtag-generator-india.git

# Push to GitHub
git push -u origin main
```

---

## 🌐 **Step 2: Deploy to Vercel (FREE)**

1. **Go to Vercel**: https://vercel.com
2. **Sign up** with your GitHub account
3. **Click "New Project"**
4. **Import** your `hashtag-generator-india` repository
5. **Deploy** - Vercel will automatically:
   - Detect it's a Next.js app
   - Install dependencies
   - Build the project
   - Deploy to global CDN

**Your app will be live at**: `https://hashtag-generator-india.vercel.app`

---

## 🗄️ **Step 3: Setup MongoDB Atlas (FREE)**

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com
2. **Sign up** for free account
3. **Create cluster** (M0 Sandbox - FREE)
4. **Create database user**
5. **Whitelist IP** (0.0.0.0/0 for all IPs)
6. **Get connection string**

### **Update Vercel Environment Variables:**
1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Add these variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hashtag-generator
JWT_SECRET=your-super-secret-jwt-key-here
TWITTER_BEARER_TOKEN=your_twitter_token
FACEBOOK_ACCESS_TOKEN=your_facebook_token
INSTAGRAM_ACCESS_TOKEN=your_instagram_token
YOUTUBE_API_KEY=your_youtube_key
GOOGLE_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
```

---

## 🎨 **Step 4: Custom Domain (Optional)**

### **Free Domain Options:**
1. **Freenom**: https://freenom.com (Free .tk, .ml, .ga domains)
2. **Dot TK**: https://dot.tk (Free .tk domains)

### **Connect to Vercel:**
1. In Vercel dashboard → **"Domains"**
2. Add your custom domain
3. Update DNS settings as instructed
4. SSL certificate will be automatically issued

---

## 💰 **Step 5: Google AdSense Setup**

1. **Go to Google AdSense**: https://adsense.google.com
2. **Sign up** with your Google account
3. **Add your website**: `https://hashtag-generator-india.vercel.app`
4. **Get approval** (usually takes 1-7 days)
5. **Add ad code** to your website

### **AdSense Code Already Added:**
Your website already has Google AdSense integration ready! Just need to:
1. Replace `ca-pub-XXXXXXXXXXXXXXXX` with your real publisher ID
2. Update environment variable in Vercel

---

## 🔧 **Step 6: Final Configuration**

### **Update Environment Variables in Vercel:**
1. Go to Vercel project → **Settings** → **Environment Variables**
2. Add all your API keys
3. **Redeploy** the project

### **Test Your Live Website:**
- Homepage: `https://your-app.vercel.app`
- Live Hashtags: `https://your-app.vercel.app/live-hashtags`
- Trending: `https://your-app.vercel.app/trending`

---

## 📊 **Cost Breakdown (FREE for 1 Year):**

| Service | Cost | What You Get |
|---------|------|--------------|
| **Vercel Hosting** | FREE | Unlimited deployments, SSL, CDN |
| **MongoDB Atlas** | FREE | 512MB database, shared clusters |
| **Domain** | FREE | .vercel.app subdomain (or free .tk domain) |
| **SSL Certificate** | FREE | Automatic HTTPS |
| **Total** | **$0** | **Professional website for 1 year** |

---

## 🚀 **Deployment Checklist:**

- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Deploy to Vercel
- [ ] Setup MongoDB Atlas
- [ ] Add environment variables
- [ ] Test live website
- [ ] Setup Google AdSense
- [ ] Add custom domain (optional)
- [ ] Start earning from ads!

---

## 🆘 **Need Help?**

If you encounter any issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints
4. Check MongoDB connection

**Your website will be live and earning from ads within 24 hours!** 🎉
