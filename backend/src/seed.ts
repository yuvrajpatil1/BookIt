import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/database";
import Experience from "./models/Experience";
import Slot from "./models/Slot";

dotenv.config();

const experiencesData = [
  {
    title: "Kayaking",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany you in kayaking through calm waters.",
    location: "Udupi",
    duration: "3 hours",
    price: 999,
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
      "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=800",
      "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=800",
    ],
    rating: 4.8,
    reviews: 243,
    category: "Adventure",
    highlights: [
      "Professional kayak instructor",
      "Complimentary drinks and snacks",
      "Calm waters perfect for beginners",
      "Small group for personalized experience",
    ],
    included: [
      "Life jackets and safety equipment",
      "Kayak and paddles",
      "Professional photography",
      "Hotel pickup available",
    ],
    notIncluded: [
      "Lunch or dinner",
      "Additional beverages",
      "Gratuities",
      "Personal expenses",
    ],
  },
  {
    title: "Nandi Hills Sunrise",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Experience breathtaking sunrise views from the hilltop with an expert guide sharing local history and heritage.",
    location: "Bangalore",
    duration: "5 hours",
    price: 899,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    ],
    rating: 4.9,
    reviews: 187,
    category: "Nature",
    highlights: [
      "Breathtaking sunrise views",
      "Ancient temples exploration",
      "Panoramic mountain views",
      "Traditional breakfast included",
    ],
    included: [
      "Professional guide",
      "Traditional breakfast",
      "Entry tickets",
      "Round-trip transportation",
    ],
    notIncluded: [
      "Personal hiking gear",
      "Travel insurance",
      "Extra snacks",
      "Gratuities",
    ],
  },
  {
    title: "Coffee Trail",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Walk through lush coffee plantations, learn about coffee processing, and enjoy fresh brews with local experts.",
    location: "Coorg",
    duration: "5 hours",
    price: 1299,
    images: [
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    ],
    rating: 4.7,
    reviews: 312,
    category: "Food & Culture",
    highlights: [
      "Coffee plantation tour",
      "Learn about coffee processing",
      "Traditional Coorgi lunch",
      "Coffee tasting session",
    ],
    included: [
      "Professional guide",
      "All tastings and samples",
      "Traditional lunch",
      "Transportation",
    ],
    notIncluded: [
      "Hotel pickup from distant locations",
      "Additional beverages",
      "Shopping purchases",
      "Gratuities",
    ],
  },
  {
    title: "Scuba Diving",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Full diving equipment and PADI certified instructors guide you through vibrant coral reefs and marine life.",
    location: "Andaman",
    duration: "4 hours",
    price: 4999,
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800",
    ],
    rating: 5.0,
    reviews: 428,
    category: "Water Sports",
    highlights: [
      "Explore vibrant coral reefs",
      "Professional PADI instructors",
      "Equipment and training included",
      "Underwater photography",
    ],
    included: [
      "Full diving equipment",
      "Pre-dive training session",
      "Underwater photos",
      "Boat transfers",
    ],
    notIncluded: [
      "Lunch",
      "Personal insurance",
      "Certification course",
      "Hotel transfers",
    ],
  },
  {
    title: "Paragliding",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Tandem flight with expert pilots, safety harnesses, and helmets for an unforgettable aerial adventure.",
    location: "Bir Billing",
    duration: "3 hours",
    price: 2499,
    images: [
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800",
      "https://images.unsplash.com/photo-1565024040131-a6e0f7c69b03?w=800",
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800",
    ],
    rating: 4.9,
    reviews: 356,
    category: "Adventure",
    highlights: [
      "Tandem flight with expert pilot",
      "Stunning Himalayan views",
      "Photos and videos included",
      "Safe and thrilling experience",
    ],
    included: [
      "All safety equipment",
      "Professional pilot",
      "Flight certificate",
      "GoPro footage",
    ],
    notIncluded: [
      "Transportation to site",
      "Meals",
      "Travel insurance",
      "Personal expenses",
    ],
  },
  {
    title: "Boat Cruise",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Life jackets and safety equipment provided for a scenic cruise through mangrove forests with wildlife spotting.",
    location: "Sunderban",
    duration: "7 hours",
    price: 1899,
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      "https://images.unsplash.com/photo-1535024966711-758541f8c85c?w=800",
    ],
    rating: 4.8,
    reviews: 267,
    category: "Nature",
    highlights: [
      "Wildlife spotting cruise",
      "Expert naturalist guide",
      "Traditional Bengali lunch",
      "Visit mangrove forests",
    ],
    included: [
      "Boat cruise",
      "Professional guide",
      "Bengali lunch",
      "Entry permits",
    ],
    notIncluded: [
      "Camera equipment",
      "Personal insurance",
      "Additional snacks",
      "Hotel transfers",
    ],
  },
  {
    title: "Bungee Jumping",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. International standard safety harnesses, helmets, and expert instructors ensure a thrilling yet safe jump experience.",
    location: "Rishikesh",
    duration: "2 hours",
    price: 3499,
    images: [
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800",
      "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    ],
    rating: 4.9,
    reviews: 412,
    category: "Adventure",
    highlights: [
      "India's highest bungee jump",
      "International safety standards",
      "Jump certificate",
      "Professional photography",
    ],
    included: [
      "All safety equipment",
      "Professional instructors",
      "Jump video and photos",
      "Certificate",
    ],
    notIncluded: [
      "Transportation",
      "Meals",
      "Personal insurance",
      "Extra merchandise",
    ],
  },
  {
    title: "River Rafting",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Life jackets, helmets, and professional rafting guides ensure safe navigation through exciting rapids.",
    location: "Rishikesh",
    duration: "6 hours",
    price: 1499,
    images: [
      "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=800",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
      "https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?w=800",
    ],
    rating: 4.8,
    reviews: 523,
    category: "Water Sports",
    highlights: [
      "Grade 3-4 rapids adventure",
      "Professional rafting guides",
      "Safety briefing included",
      "Riverside lunch",
    ],
    included: [
      "Rafting equipment",
      "Life jackets and helmets",
      "Professional guide",
      "Lunch by the river",
    ],
    notIncluded: [
      "Hotel transfers",
      "Personal expenses",
      "Additional activities",
      "Gratuities",
    ],
  },
  {
    title: "Desert Safari",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Expert camel handlers and guides lead you through golden sand dunes with traditional Rajasthani hospitality.",
    location: "Jaisalmer",
    duration: "8 hours",
    price: 2999,
    images: [
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800",
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800",
      "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800",
    ],
    rating: 4.9,
    reviews: 395,
    category: "Adventure",
    highlights: [
      "Camel safari experience",
      "Sunset views over sand dunes",
      "Traditional Rajasthani dinner",
      "Cultural dance performance",
    ],
    included: [
      "Camel safari",
      "Desert camping",
      "Dinner and breakfast",
      "Cultural program",
    ],
    notIncluded: [
      "Hotel pickup beyond 10km",
      "Alcoholic beverages",
      "Personal expenses",
      "Tips",
    ],
  },
  {
    title: "Trekking Adventure",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Experienced mountain guides, first aid kits, and trekking poles provided for safe Himalayan exploration.",
    location: "Manali",
    duration: "10 hours",
    price: 1999,
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    ],
    rating: 4.7,
    reviews: 289,
    category: "Nature",
    highlights: [
      "Scenic Himalayan trails",
      "Experienced mountain guide",
      "Packed lunch included",
      "Photography opportunities",
    ],
    included: [
      "Professional trek guide",
      "Trekking permits",
      "Packed lunch",
      "First aid kit",
    ],
    notIncluded: [
      "Trekking boots rental",
      "Personal trekking gear",
      "Travel insurance",
      "Hotel accommodation",
    ],
  },
  {
    title: "Wildlife Safari",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Expert naturalists, binoculars, and secure safari jeeps for safe wildlife observation in natural habitat.",
    location: "Jim Corbett",
    duration: "6 hours",
    price: 2499,
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800",
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800",
    ],
    rating: 4.8,
    reviews: 421,
    category: "Nature",
    highlights: [
      "Spot tigers and elephants",
      "Expert naturalist guide",
      "Morning and evening slots",
      "Photography allowed",
    ],
    included: [
      "Jeep safari",
      "Park entry fees",
      "Professional guide",
      "Binoculars provided",
    ],
    notIncluded: [
      "Camera fees",
      "Meals",
      "Hotel accommodation",
      "Personal expenses",
    ],
  },
  {
    title: "Rock Climbing",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Climbing harnesses, helmets, ropes, and professional instructors ensure safe boulder climbing adventures.",
    location: "Hampi",
    duration: "4 hours",
    price: 1299,
    images: [
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800",
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800",
      "https://images.unsplash.com/photo-1581224463294-7e61dc46e0de?w=800",
    ],
    rating: 4.7,
    reviews: 234,
    category: "Adventure",
    highlights: [
      "Boulder climbing experience",
      "Professional instructors",
      "All equipment provided",
      "Multiple difficulty levels",
    ],
    included: [
      "Climbing equipment",
      "Safety gear and helmets",
      "Professional instructor",
      "Training session",
    ],
    notIncluded: [
      "Transportation",
      "Meals and drinks",
      "Personal insurance",
      "Climbing shoes rental",
    ],
  },
  {
    title: "Zip Lining",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Safety harnesses, helmets, and professional supervision for thrilling zip line rides across fort valleys.",
    location: "Neemrana",
    duration: "3 hours",
    price: 1599,
    images: [
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800",
    ],
    rating: 4.8,
    reviews: 312,
    category: "Adventure",
    highlights: [
      "Multiple zip line routes",
      "Fort valley views",
      "Safe and thrilling",
      "Video recording available",
    ],
    included: [
      "All safety equipment",
      "Professional supervision",
      "Multiple zip rides",
      "Safety briefing",
    ],
    notIncluded: [
      "Video recording",
      "Food and beverages",
      "Transportation",
      "Personal expenses",
    ],
  },
  {
    title: "Hot Air Balloon",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Experienced pilots, safety equipment, and ground crew ensure a magical sunrise flight experience.",
    location: "Jaipur",
    duration: "4 hours",
    price: 8999,
    images: [
      "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?w=800",
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800",
      "https://images.unsplash.com/photo-1520962922320-2038559e6d1e?w=800",
    ],
    rating: 5.0,
    reviews: 567,
    category: "Adventure",
    highlights: [
      "Sunrise balloon flight",
      "Champagne breakfast",
      "Aerial views of palaces",
      "Flight certificate",
    ],
    included: [
      "Hot air balloon ride",
      "Champagne celebration",
      "Breakfast",
      "Hotel transfers",
    ],
    notIncluded: [
      "Additional guests fees",
      "Personal photography",
      "Travel insurance",
      "Gratuities",
    ],
  },
  {
    title: "Camping Experience",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Camping equipment, safety measures, and experienced guides for a memorable lakeside overnight adventure.",
    location: "Pawna Lake",
    duration: "24 hours",
    price: 1799,
    images: [
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800",
      "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800",
    ],
    rating: 4.6,
    reviews: 445,
    category: "Nature",
    highlights: [
      "Lakeside camping",
      "Bonfire and music",
      "BBQ dinner included",
      "Stargazing experience",
    ],
    included: [
      "Camping equipment",
      "Dinner and breakfast",
      "Bonfire",
      "Indoor games",
    ],
    notIncluded: [
      "Personal tents",
      "Alcoholic beverages",
      "Transportation",
      "Personal expenses",
    ],
  },
  {
    title: "Snorkeling",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Snorkeling equipment, life jackets, and professional guides for exploring vibrant underwater marine life.",
    location: "Goa",
    duration: "3 hours",
    price: 1499,
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800",
      "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=800",
    ],
    rating: 4.7,
    reviews: 398,
    category: "Water Sports",
    highlights: [
      "Crystal clear waters",
      "Colorful marine life",
      "All equipment provided",
      "Beginner friendly",
    ],
    included: [
      "Snorkeling equipment",
      "Life jackets",
      "Professional guide",
      "Boat transfers",
    ],
    notIncluded: [
      "Underwater camera",
      "Meals",
      "Hotel transfers",
      "Personal expenses",
    ],
  },
  {
    title: "Cycling Tour",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Quality bicycles, helmets, and expert local guides for exploring city heritage and culture safely.",
    location: "Udaipur",
    duration: "5 hours",
    price: 899,
    images: [
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800",
      "https://images.unsplash.com/photo-1523626797181-8c5ae80d40c2?w=800",
    ],
    rating: 4.5,
    reviews: 276,
    category: "Culture",
    highlights: [
      "Explore city heritage",
      "Visit local markets",
      "Traditional snacks tasting",
      "Small group experience",
    ],
    included: [
      "Bicycle and helmet",
      "Professional guide",
      "Snacks and water",
      "Entry tickets",
    ],
    notIncluded: [
      "Lunch",
      "Personal expenses",
      "Shopping purchases",
      "Gratuities",
    ],
  },
  {
    title: "Yoga Retreat",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Professional yoga instructors, meditation guides, and yoga mats provided for a holistic wellness experience.",
    location: "Rishikesh",
    duration: "3 hours",
    price: 799,
    images: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
      "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800",
    ],
    rating: 4.9,
    reviews: 531,
    category: "Wellness",
    highlights: [
      "Professional yoga instructor",
      "Riverside location",
      "Meditation session",
      "Healthy breakfast included",
    ],
    included: [
      "Yoga session",
      "Meditation guide",
      "Yoga mats provided",
      "Healthy breakfast",
    ],
    notIncluded: [
      "Personal yoga mat",
      "Hotel transfers",
      "Additional meals",
      "Personal expenses",
    ],
  },
];

async function seedDatabase() {
  try {
    await connectDB();

    await Experience.deleteMany({});
    await Slot.deleteMany({});
    console.log("Cleared existing data");

    for (const expData of experiencesData) {
      const experience = await Experience.create(expData);
      console.log(`Created experience: ${experience.title}`);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = 0; i < 14; i++) {
        const slotDate = new Date(today);
        slotDate.setDate(today.getDate() + i);

        const times = ["09:00 AM", "12:00 PM", "03:00 PM", "06:00 PM"];
        for (const time of times) {
          await Slot.create({
            experienceId: experience._id,
            date: slotDate,
            time: time,
            availableSpots: Math.floor(Math.random() * 10) + 5,
            totalSpots: 15,
          });
        }
      }
      console.log(`Created slots for: ${experience.title}`);
    }

    console.log("Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
