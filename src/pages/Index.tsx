import { useState, useMemo } from "react";
import { MapPin, Search, Dumbbell, Loader2, Navigation } from "lucide-react";
import GymMap from "@/components/GymMap";
import GymCard from "@/components/GymCard";
import FilterPanel, { Filters } from "@/components/FilterPanel";
import { MOCK_GYMS, Gym } from "@/data/gyms";
import { useGeolocation, getDistanceKm, formatDistance } from "@/hooks/use-geolocation";

const DEFAULT_FILTERS: Filters = {
  maxPrice: 100,
  equipmentLevels: ["basic", "equipped", "premium"],
  sportTypes: ["musculation", "crossfit", "yoga", "boxe", "natation", "fitness"],
  minRating: 0,
};

const Index = () => {
  const [selectedGymId, setSelectedGymId] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState("");
  const userLocation = useGeolocation();

  const gymsWithDistance = useMemo((): (Gym & { distance: number })[] => {
    return MOCK_GYMS.map((gym) => ({
      ...gym,
      distance: getDistanceKm(userLocation.lat, userLocation.lng, gym.lat, gym.lng),
    }));
  }, [userLocation.lat, userLocation.lng]);

  const filteredGyms = useMemo(() => {
    return gymsWithDistance
      .filter((gym) => {
        if (gym.pricePerMonth > filters.maxPrice) return false;
        if (!filters.equipmentLevels.includes(gym.equipmentLevel)) return false;
        if (!gym.sportTypes.some((s) => filters.sportTypes.includes(s))) return false;
        if (gym.rating < filters.minRating) return false;
        if (search && !gym.name.toLowerCase().includes(search.toLowerCase()) && !gym.address.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => a.distance - b.distance);
  }, [gymsWithDistance, filters, search]);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="shrink-0 border-b border-border bg-card/80 backdrop-blur-sm px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="font-display text-lg font-bold text-foreground">GymSpot</h1>
          </div>

          <div className="flex-1 max-w-sm relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher une salle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {userLocation.loading ? (
              <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
            ) : (
              <Navigation className="w-3.5 h-3.5 text-primary" />
            )}
            <span>{userLocation.loading ? "Localisation..." : userLocation.error ? "Paris (par défaut)" : "Position détectée"}</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[380px] shrink-0 border-r border-border flex flex-col bg-card/50">
          <div className="relative p-3 border-b border-border">
            <div className="flex items-center justify-between">
              <FilterPanel
                filters={filters}
                onChange={setFilters}
                open={filtersOpen}
                onToggle={() => setFiltersOpen(!filtersOpen)}
              />
              <span className="text-xs text-muted-foreground">
                {filteredGyms.length} salle{filteredGyms.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {filteredGyms.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Dumbbell className="w-10 h-10 mb-3 opacity-30" />
                <p className="text-sm">Aucune salle trouvée</p>
                <p className="text-xs mt-1">Essayez d'ajuster vos filtres</p>
              </div>
            ) : (
              filteredGyms.map((gym) => (
                <GymCard
                  key={gym.id}
                  gym={gym}
                  selected={selectedGymId === gym.id}
                  onClick={() => setSelectedGymId(gym.id === selectedGymId ? null : gym.id)}
                />
              ))
            )}
          </div>
        </aside>

        {/* Map */}
        <main className="flex-1 relative">
          <GymMap
            gyms={filteredGyms}
            selectedGymId={selectedGymId}
            onGymSelect={(id) => setSelectedGymId(id === selectedGymId ? null : id)}
            userLocation={userLocation.loading ? undefined : { lat: userLocation.lat, lng: userLocation.lng }}
          />
        </main>
      </div>
    </div>
  );
};

export default Index;
