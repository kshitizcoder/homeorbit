import livingRoom from "../assets/LivingRoom.jpg";
import bedRoom from "../assets/BedRoom.jpg";
import kitchenRoom from "../assets/Kitchen.jpg";
import bathRoom from "../assets/Bathroom.jpg";

export const roomsData = {
  livingRoom: {
    id: "livingRoom",
    title: "Living Room",
    image: livingRoom,
    description:
      "Spacious living area with modern furnishings and natural light",
    features: ["High Ceilings", "Large Windows", "Fireplace"],
    hotspots: [
      { x: 75, y: 45, target: "kitchen", label: "Kitchen" },
      { x: 25, y: 60, target: "bedroom", label: "Bedroom" },
    ],
  },
  kitchen: {
    id: "kitchen",
    title: "Modern Kitchen",
    image: kitchenRoom,
    description: "Fully equipped kitchen with premium appliances",
    features: ["Island Counter", "Smart Appliances", "Custom Cabinets"],
    hotspots: [
      { x: 15, y: 50, target: "livingRoom", label: "Living Room" },
      { x: 85, y: 45, target: "bathroom", label: "Bathroom" },
    ],
  },
  bedroom: {
    id: "bedroom",
    title: "Master Bedroom",
    image: bedRoom,
    description: "Luxurious master suite with walk-in closet",
    features: ["En-suite Bathroom", "Walk-in Closet", "Balcony Access"],
    hotspots: [
      { x: 65, y: 55, target: "bathroom", label: "Bathroom" },
      { x: 35, y: 45, target: "livingRoom", label: "Living Room" },
    ],
  },
  bathroom: {
    id: "bathroom",
    title: "Luxury Bathroom",
    image: bathRoom,
    description: "Spa-like bathroom with premium fixtures",
    features: ["Double Vanity", "Rain Shower", "Heated Floors"],
    hotspots: [
      { x: 20, y: 50, target: "bedroom", label: "Bedroom" },
      { x: 80, y: 45, target: "kitchen", label: "Kitchen" },
    ],
  },
};
