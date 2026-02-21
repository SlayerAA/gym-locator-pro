import { Star, MapPin, Clock, Dumbbell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Gym, EQUIPMENT_LABELS, SPORT_LABELS } from "@/data/gyms";

interface GymCardProps {
  gym: Gym;
  selected?: boolean;
  onClick?: () => void;
}

const equipmentVariant = (level: Gym["equipmentLevel"]) => {
  switch (level) {
    case "premium": return "bg-gym-premium/15 text-gym-premium border-gym-premium/30";
    case "equipped": return "bg-gym-equipped/15 text-gym-equipped border-gym-equipped/30";
    case "basic": return "bg-gym-basic/15 text-gym-basic border-gym-basic/30";
  }
};

const GymCard = ({ gym, selected, onClick }: GymCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-lg overflow-hidden border transition-all duration-200 animate-slide-up ${
        selected
          ? "border-primary bg-card ring-1 ring-primary/30"
          : "border-border bg-card hover:border-primary/40"
      }`}
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={gym.image}
          alt={gym.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
        <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
          <h3 className="font-display text-base font-bold text-foreground truncate">
            {gym.name}
          </h3>
          <span className="font-display text-lg font-bold text-primary shrink-0 ml-2">
            {gym.pricePerMonth}€<span className="text-xs text-muted-foreground font-normal">/mois</span>
          </span>
        </div>
      </div>

      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-star text-star" />
            <span className="text-sm font-semibold text-foreground">{gym.rating}</span>
            <span className="text-xs text-muted-foreground">({gym.reviewCount})</span>
          </div>
          <Badge variant="outline" className={`text-[10px] px-2 py-0 ${equipmentVariant(gym.equipmentLevel)}`}>
            {EQUIPMENT_LABELS[gym.equipmentLevel]}
          </Badge>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{gym.address}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3 h-3 shrink-0" />
          <span>{gym.openHours}</span>
        </div>

        <div className="flex flex-wrap gap-1 pt-1">
          {gym.sportTypes.map((sport) => (
            <span
              key={sport}
              className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground"
            >
              {SPORT_LABELS[sport]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GymCard;
