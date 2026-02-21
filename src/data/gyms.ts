export type EquipmentLevel = "basic" | "equipped" | "premium";
export type SportType = "musculation" | "crossfit" | "yoga" | "boxe" | "natation" | "fitness";

export interface Gym {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  pricePerMonth: number;
  equipmentLevel: EquipmentLevel;
  rating: number;
  reviewCount: number;
  sportTypes: SportType[];
  openHours: string;
  distance?: number;
  image: string;
}

export const MOCK_GYMS: Gym[] = [
  {
    id: "1",
    name: "FitPulse Arena",
    lat: 48.8606,
    lng: 2.3376,
    address: "15 Rue de Rivoli, Paris",
    pricePerMonth: 45,
    equipmentLevel: "premium",
    rating: 4.7,
    reviewCount: 342,
    sportTypes: ["musculation", "crossfit", "yoga"],
    openHours: "6h - 23h",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=250&fit=crop",
  },
  {
    id: "2",
    name: "Iron Temple",
    lat: 48.8530,
    lng: 2.3499,
    address: "8 Bd Saint-Germain, Paris",
    pricePerMonth: 29,
    equipmentLevel: "equipped",
    rating: 4.3,
    reviewCount: 187,
    sportTypes: ["musculation", "boxe"],
    openHours: "7h - 22h",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=250&fit=crop",
  },
  {
    id: "3",
    name: "Zen Studio",
    lat: 48.8665,
    lng: 2.3212,
    address: "42 Rue du Faubourg Saint-Honoré, Paris",
    pricePerMonth: 60,
    equipmentLevel: "premium",
    rating: 4.9,
    reviewCount: 98,
    sportTypes: ["yoga", "fitness"],
    openHours: "8h - 21h",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=250&fit=crop",
  },
  {
    id: "4",
    name: "Budget Fit",
    lat: 48.8480,
    lng: 2.3520,
    address: "3 Place d'Italie, Paris",
    pricePerMonth: 15,
    equipmentLevel: "basic",
    rating: 3.8,
    reviewCount: 256,
    sportTypes: ["musculation", "fitness"],
    openHours: "6h - 22h",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=250&fit=crop",
  },
  {
    id: "5",
    name: "CrossBox Paris",
    lat: 48.8720,
    lng: 2.3450,
    address: "22 Rue La Fayette, Paris",
    pricePerMonth: 55,
    equipmentLevel: "equipped",
    rating: 4.5,
    reviewCount: 134,
    sportTypes: ["crossfit", "boxe", "fitness"],
    openHours: "6h30 - 22h30",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=250&fit=crop",
  },
  {
    id: "6",
    name: "AquaGym Center",
    lat: 48.8555,
    lng: 2.3250,
    address: "11 Rue de Sèvres, Paris",
    pricePerMonth: 50,
    equipmentLevel: "premium",
    rating: 4.6,
    reviewCount: 210,
    sportTypes: ["natation", "fitness", "yoga"],
    openHours: "7h - 21h30",
    image: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=400&h=250&fit=crop",
  },
  {
    id: "7",
    name: "Muscle Factory",
    lat: 48.8640,
    lng: 2.3600,
    address: "5 Rue Oberkampf, Paris",
    pricePerMonth: 25,
    equipmentLevel: "basic",
    rating: 4.0,
    reviewCount: 89,
    sportTypes: ["musculation"],
    openHours: "7h - 23h",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=250&fit=crop",
  },
  {
    id: "8",
    name: "Elite Performance",
    lat: 48.8700,
    lng: 2.3150,
    address: "88 Avenue des Champs-Élysées, Paris",
    pricePerMonth: 89,
    equipmentLevel: "premium",
    rating: 4.8,
    reviewCount: 412,
    sportTypes: ["musculation", "crossfit", "yoga", "boxe", "natation", "fitness"],
    openHours: "5h - 0h",
    image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400&h=250&fit=crop",
  },
];

export const SPORT_LABELS: Record<SportType, string> = {
  musculation: "Musculation",
  crossfit: "CrossFit",
  yoga: "Yoga",
  boxe: "Boxe",
  natation: "Natation",
  fitness: "Fitness",
};

export const EQUIPMENT_LABELS: Record<EquipmentLevel, string> = {
  basic: "Basique",
  equipped: "Bien équipé",
  premium: "Premium",
};
