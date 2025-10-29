# Deployment Guide for BookIt

This guide provides step-by-step instructions for deploying the BookIt application to various cloud platforms with MongoDB Atlas.

## Table of Contents
- [Prerequisites](#prerequisites)
- [MongoDB Atlas Setup](#mongodb-atlas-setup)
- [Backend Deployment](#backend-deployment)
  - [Render](#deploying-backend-to-render)
  - [Railway](#deploying-backend-to-railway)
- [Frontend Deployment](#frontend-deployment)
  - [Vercel](#deploying-frontend-to-vercel)
  - [Netlify](#deploying-frontend-to-netlify)
- [Post-Deployment](#post-deployment)

## Prerequisites

Before deploying, ensure you have:
- A GitHub account with your code pushed to a repository
- MongoDB Atlas account (free tier available)
- Accounts on your chosen deployment platforms
- Database seeded with sample data

## MongoDB Atlas Setup

MongoDB Atlas will be used for both development and production.

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Select "M0 Free" tier
   - Choose a cloud provider and region (closest to your users)
   - Name your cluster (e.g., "bookit-cluster")
   - Click "Create"

3. **Create Database User**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Set username and password (save these securely)
   - Set role to "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
   - Note: For production, you can restrict this to your deployment platform's IPs

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Add `/bookit` after the cluster address for the database name

Your connection string should look like:
```
mongodb+srv://username:password@cluster.mongodb.net/bookit?retryWrites=true&w=majority
```

## Backend Deployment

### Deploying Backend to Render

1. **Deploy Backend Service**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - Name: `bookit-backend`
     - Region: Choose closest to your users
     - Branch: `main`
     - Root Directory: `backend`
     - Runtime: `Node`
     - Build Command: `npm install && npm run build`
     - Start Command: `npm start`

2. **Set Environment Variables**
   - Add the following environment variables:
     ```
     PORT=5000
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookit?retryWrites=true&w=majority
     NODE_ENV=production
     ```
   - Replace with your actual MongoDB Atlas connection string

3. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

4. **Seed Database**
   - Go to the Shell tab in Render
   - Run: `npm run seed`
   - Or seed from your local machine by temporarily allowing your IP in MongoDB Atlas

5. **Note Your Backend URL**
   - Your backend will be available at: `https://bookit-backend.onrender.com`

### Deploying Backend to Railway

1. **Create New Project**
   - Go to [Railway](https://railway.app/)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

2. **Configure Backend Service**
   - Click on your service
   - Go to Settings
   - Set Root Directory: `backend`
   - Set Build Command: `npm install && npm run build`
   - Set Start Command: `npm start`

3. **Set Environment Variables**
   - Go to Variables tab
   - Add:
     ```
     PORT=5000
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookit?retryWrites=true&w=majority
     NODE_ENV=production
     ```
   - Replace with your actual MongoDB Atlas connection string

4. **Deploy and Seed**
   - Railway will auto-deploy
   - Use the Railway CLI to seed:
     ```bash
     railway run npm run seed
     ```
   - Or run locally with production MongoDB URI

5. **Get Public URL**
   - Go to Settings → Networking
   - Generate Domain
   - Note your backend URL

## Frontend Deployment

### Deploying Frontend to Vercel

1. **Prepare Frontend**
   - Your environment variable will be set in Vercel dashboard

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com/)
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: `Vite`
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com/api
     ```
   - Apply to Production, Preview, and Development

4. **Deploy**
   - Click "Deploy"
   - Your site will be live at: `https://your-project.vercel.app`

### Deploying Frontend to Netlify

1. **Prepare Frontend**
   - Create `netlify.toml` in frontend directory:
     ```toml
     [build]
       command = "npm run build"
       publish = "dist"

     [[redirects]]
       from = "/*"
       to = "/index.html"
       status = 200
     ```

2. **Deploy to Netlify**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Configure:
     - Base directory: `frontend`
     - Build command: `npm run build`
     - Publish directory: `frontend/dist`

3. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com/api
     ```

4. **Deploy**
   - Click "Deploy site"
   - Your site will be live at: `https://your-site.netlify.app`

## Post-Deployment

### Testing Your Deployed Application

1. Visit your frontend URL
2. Test the complete booking flow:
   - Browse experiences
   - View experience details
   - Select date and time
   - Fill checkout form
   - Apply promo code
   - Complete booking
   - Verify confirmation page

### Monitoring

#### Backend Monitoring
- Check logs in Render/Railway dashboard
- Monitor MongoDB Atlas metrics in Atlas dashboard
- Set up alerts for errors

#### Frontend Monitoring
- Use Vercel/Netlify analytics
- Check for build errors
- Monitor page load times

#### MongoDB Atlas Monitoring
- Go to your cluster in Atlas
- Check "Metrics" tab for:
  - Connection count
  - Network traffic
  - Storage usage
  - Query performance

### Common Deployment Issues

#### CORS Errors
Update backend `server.ts` to allow your frontend domain:
```typescript
app.use(cors({
  origin: ['https://your-frontend.vercel.app']
}));
```

#### MongoDB Connection Issues
- Verify connection string is correct
- Check Network Access whitelist (0.0.0.0/0 for all IPs)
- Ensure database user has correct permissions
- Check if you've exceeded free tier limits

#### Environment Variables Not Loading
- Rebuild after adding variables
- Check variable names match exactly (including VITE_ prefix for frontend)
- Verify variables are set for correct environment

#### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Review build logs for specific errors

### MongoDB Atlas Production Considerations

#### Free Tier Limits (M0)
- 512 MB storage
- Shared RAM
- Good for development and small projects
- Consider upgrading for production

#### Upgrade Path
For production apps with more traffic:
- M2 ($9/month): 2GB storage
- M5 ($25/month): 5GB storage
- Better performance and scalability

#### Security Best Practices
1. Use strong database passwords
2. Restrict IP access to deployment platforms only
3. Enable database encryption
4. Regular backups (available in paid tiers)
5. Monitor suspicious activity

### Custom Domain Setup

#### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

#### Netlify
1. Go to Domain settings
2. Add custom domain
3. Configure DNS records

#### Render
1. Go to Settings → Custom Domains
2. Add your domain
3. Update DNS records

## Updating Your Deployment

### Backend Updates
1. Push changes to GitHub
2. Render/Railway will auto-deploy
3. Monitor logs for any errors
4. Run seed if schema changed

### Frontend Updates
1. Push changes to GitHub
2. Vercel/Netlify will auto-deploy
3. Clear CDN cache if needed

## Rollback

If you need to rollback:

### Render
- Go to Events tab
- Click on previous deployment
- Click "Redeploy"

### Railway
- Go to Deployments
- Select previous deployment
- Click "Redeploy"

### Vercel/Netlify
- Go to Deployments
- Find previous successful deployment
- Click "Publish" or "Deploy"

## Security Checklist

- [ ] Environment variables are set correctly
- [ ] MongoDB Atlas password is strong
- [ ] Network access is properly configured
- [ ] CORS is configured for production domains only
- [ ] API rate limiting is configured (optional)
- [ ] HTTPS is enabled (automatic on Vercel/Netlify/Render)
- [ ] Database backups are configured (paid tier)
- [ ] Error messages don't expose sensitive information

## Performance Optimization

1. **MongoDB Atlas**
   - Create indexes on frequently queried fields
   - Monitor slow queries in Atlas
   - Use MongoDB connection pooling (enabled by default in Mongoose)
   - Consider read replicas for high traffic (paid tier)

2. **Backend**
   - Enable compression middleware
   - Implement caching for frequently accessed data
   - Optimize API queries
   - Use CDN for static assets

3. **Frontend**
   - Enable gzip compression
   - Optimize images
   - Implement lazy loading
   - Use CDN (automatic with Vercel/Netlify)

## Cost Estimation

### Free Tier (Development/Testing)
- MongoDB Atlas M0: Free
- Render Free Tier: Free (sleeps after inactivity)
- Vercel Hobby: Free
- Total: $0/month

### Production Setup
- MongoDB Atlas M2: $9/month
- Render Starter: $7/month
- Vercel Pro: $20/month
- Total: ~$36/month

## Support

If you encounter issues during deployment:
1. Check MongoDB Atlas connection status
2. Review platform-specific documentation
3. Verify environment variables
4. Check application logs
5. Test locally with production settings
6. Contact platform support if needed

## Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
