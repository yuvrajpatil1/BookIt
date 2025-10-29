# Quick Start Guide

Get BookIt up and running in 5 minutes.

## Prerequisites
- Node.js 18+
- MongoDB Atlas account (free)

## Quick Setup

### 1. MongoDB Atlas Setup (2 minutes)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up
2. Create a free M0 cluster
3. Create a database user (Database Access)
4. Add your IP to whitelist (Network Access → Add IP Address → Allow Access from Anywhere)
5. Get your connection string (Connect → Connect your application)

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with your MongoDB Atlas connection string:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookit?retryWrites=true&w=majority
NODE_ENV=development
```

Start backend and seed database:
```bash
npm run dev
```

In another terminal:
```bash
cd backend
npm run seed
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
```

Start frontend:
```bash
npm run dev
```

### 4. Access Application

Open your browser and navigate to:
```
http://localhost:3000
```

## Test Promo Codes

Try these promo codes during checkout:
- `SAVE10` - 10% discount
- `FLAT100` - $100 flat discount
- `WELCOME20` - 20% discount
- `FIRSTTIME` - 15% discount

## Default Port Configuration

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- Database: MongoDB Atlas (cloud)

## Common Commands

### Backend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run seed` - Seed database

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Troubleshooting

### Port Already in Use
Change the port in the respective `.env` file.

### MongoDB Connection Failed
- Check your connection string format
- Verify IP is whitelisted in MongoDB Atlas
- Ensure database user credentials are correct

### Module Not Found
Reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for hosting instructions
- Explore the codebase structure
- Customize the experiences data in `backend/src/seed.ts`

## Support

For issues or questions, please refer to the main README or open an issue in the repository.
