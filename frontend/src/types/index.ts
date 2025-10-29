export interface Experience {
  _id: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  price: number;
  images: string[];
  rating: number;
  reviews: number;
  category: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  createdAt?: string;
  updatedAt?: string;
  slots?: Slot[];
}

export interface Slot {
  _id: string;
  experienceId: string;
  date: string;
  time: string;
  availableSpots: number;
  totalSpots: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Booking {
  _id?: string;
  experienceId: string;
  slotId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  numberOfGuests: number;
  promoCode?: string;
  discount: number;
  totalPrice: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PromoCode {
  valid: boolean;
  code: string;
  discount: number;
  type: string;
  value: number;
}
