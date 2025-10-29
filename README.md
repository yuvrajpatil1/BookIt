# BookIt: Experiences & Slots

A full-stack web application for booking travel experiences. Users can explore experiences, select available time slots, apply promo codes, and complete bookings.

## Tech Stack

### Frontend

- React with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- React Router for navigation
- Axios for API calls
- Lucide React for icons

### Backend

- Node.js with Express
- TypeScript
- MongoDB Atlas (cloud database)
- Mongoose ODM
- Express Validator for input validation

## Features

- Browse travel experiences with rich details
- View available dates and time slots
- Real-time availability checking
- Promo code validation and discounts
- Form validation for booking details
- Responsive design for mobile and desktop
- Transaction-based booking to prevent double-booking
- Booking confirmation page

## Project Structure

```
BookIt/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── models/
│   │   │   ├── Experience.ts
│   │   │   ├── Slot.ts
│   │   │   ├── Booking.ts
│   │   │   └── index.ts
│   │   ├── routes/
│   │   │   ├── experiences.ts
│   │   │   ├── bookings.ts
│   │   │   └── promo.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Header.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── DetailsPage.tsx
│   │   │   ├── CheckoutPage.tsx
│   │   │   └── ResultPage.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Prerequisites

- Node.js 18 or higher
- MongoDB Atlas account
- npm or yarn package manager

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd BookIt
```

### 2. MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (M0 free tier is sufficient)
3. Go to Database Access and create a database user with read/write permissions
4. Go to Network Access and add your IP address (or allow access from anywhere for development: 0.0.0.0/0)
5. Click "Connect" on your cluster and select "Connect your application"
6. Copy the connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/`)

### 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookit?retryWrites=true&w=majority
NODE_ENV=development
```

Replace:

- `username` with your MongoDB Atlas username
- `password` with your MongoDB Atlas password
- `cluster` with your cluster name

Start the backend server:

```bash
npm run dev
```

Seed the database with sample data:

```bash
npm run seed
```

The backend will run on `http://localhost:5000`

### 4. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Available API Endpoints

### Experiences

- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get experience by ID with available slots

### Bookings

- `POST /api/bookings` - Create a new booking

Request body:

```json
{
  "experienceId": "507f1f77bcf86cd799439011",
  "slotId": "507f191e810c19729de860ea",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+1234567890",
  "numberOfGuests": 2,
  "promoCode": "SAVE10",
  "discount": 18.0,
  "totalPrice": 161.98
}
```

### Promo Codes

- `POST /api/promo/validate` - Validate a promo code

Request body:

```json
{
  "code": "SAVE10",
  "subtotal": 179.98
}
```

Available promo codes:

- `SAVE10` - 10% off
- `FLAT100` - $100 flat discount
- `WELCOME20` - 20% off
- `FIRSTTIME` - 15% off

## Building for Production

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

The built files will be in the `dist` directory.

## Deployment

### Backend Deployment

The backend can be deployed to platforms like:

- Render
- Railway
- Heroku
- AWS Elastic Beanstalk

Make sure to:

1. Set environment variables in the hosting platform
2. Use your MongoDB Atlas connection string
3. Run database seed command after deployment

### Frontend Deployment

The frontend can be deployed to:

- Vercel
- Netlify
- AWS S3 + CloudFront

Build the project first:

```bash
npm run build
```

Configure the `VITE_API_URL` environment variable to point to your production backend URL.

## Environment Variables

### Backend

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB Atlas connection string
- `NODE_ENV` - Environment (development/production)

### Frontend

- `VITE_API_URL` - Backend API URL

## Features Implementation

### Prevent Double Booking

The backend uses MongoDB sessions and transactions to ensure that slots are properly decremented when bookings are made, preventing race conditions.

### Form Validation

- Email validation using regex
- Required field validation
- Phone number validation
- Guest count validation against available spots

### Responsive Design

The application is fully responsive with:

- Mobile-first approach
- Breakpoints for tablets and desktops
- Touch-friendly interface
- Optimized images
