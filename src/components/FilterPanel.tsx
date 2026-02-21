import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal, X } from "lucide-react";
import { EquipmentLevel, SportType, SPORT_LABELS, EQUIPMENT_LABELS } from "@/data/gyms";

export interface Filters {
  maxPrice: number;
  equipmentLevels: EquipmentLevel[];
  sportTypes: SportType[];
  minRating: number;
}

interface FilterPanelProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  open: boolean;
  onToggle: () => void;
}

const ALL_SPORTS: SportType[] = ["musculation", "crossfit", "yoga", "boxe", "natation", "fitness"];
const ALL_EQUIPMENT: EquipmentLevel[] = ["basic", "equipped", "premium"];

const FilterPanel = ({ filters, onChange, open, onToggle }: FilterPanelProps) => {
  const toggleSport = (sport: SportType) => {
    const next = filters.sportTypes.includes(sport)
      ? filters.sportTypes.filter((s) => s !== sport)
      : [...filters.sportTypes, sport];
    onChange({ ...filters, sportTypes: next });
  };

  const toggleEquipment = (level: EquipmentLevel) => {
    const next = filters.equipmentLevels.includes(level)
      ? filters.equipmentLevels.filter((l) => l !== level)
      : [...filters.equipmentLevels, level];
    onChange({ ...filters, equipmentLevels: next });
  };

  const activeCount =
    (filters.maxPrice < 100 ? 1 : 0) +
    (filters.equipmentLevels.length < 3 ? 1 : 0) +
    (filters.sportTypes.length < 6 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm font-medium"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filtres
        {activeCount > 0 && (
          <span className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full font-bold">
            {activeCount}
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="absolute top-14 left-0 right-0 z-20 bg-card border border-border rounded-lg p-4 shadow-2xl animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-sm">Filtres</h3>
            <button onClick={onToggle} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-5">
            {/* Price */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">
                Prix max : <span className="text-foreground font-semibold">{filters.maxPrice}€/mois</span>
              </Label>
              <Slider
                value={[filters.maxPrice]}
                min={10}
                max={100}
                step={5}
                onValueChange={([v]) => onChange({ ...filters, maxPrice: v })}
                className="mt-2"
              />
            </div>

            {/* Rating */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">
                Note minimum : <span className="text-foreground font-semibold">{filters.minRating}+</span>
              </Label>
              <Slider
                value={[filters.minRating]}
                min={0}
                max={5}
                step={0.5}
                onValueChange={([v]) => onChange({ ...filters, minRating: v })}
                className="mt-2"
              />
            </div>

            {/* Equipment */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Niveau d'équipement</Label>
              <div className="flex flex-wrap gap-2">
                {ALL_EQUIPMENT.map((level) => (
                  <button
                    key={level}
                    onClick={() => toggleEquipment(level)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      filters.equipmentLevels.includes(level)
                        ? "bg-primary/15 border-primary/40 text-primary"
                        : "bg-secondary border-border text-muted-foreground"
                    }`}
                  >
                    {EQUIPMENT_LABELS[level]}
                  </button>
                ))}
              </div>
            </div>

            {/* Sport types */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Type de sport</Label>
              <div className="flex flex-wrap gap-2">
                {ALL_SPORTS.map((sport) => (
                  <button
                    key={sport}
                    onClick={() => toggleSport(sport)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      filters.sportTypes.includes(sport)
                        ? "bg-primary/15 border-primary/40 text-primary"
                        : "bg-secondary border-border text-muted-foreground"
                    }`}
                  >
                    {SPORT_LABELS[sport]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;
