import { useState, useEffect } from "react";

export interface UserLocation {
  lat: number;
  lng: number;
  loading: boolean;
  error: string | null;
}

export const useGeolocation = (): UserLocation => {
  const [location, setLocation] = useState<UserLocation>({
    lat: 48.8606,
    lng: 2.3376,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({ ...prev, loading: false, error: "Géolocalisation non supportée" }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          loading: false,
          error: null,
        });
      },
      () => {
        // Fallback to Paris center
        setLocation((prev) => ({ ...prev, loading: false, error: "Position non disponible" }));
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  return location;
};

/** Haversine distance in km */
export const getDistanceKm = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const formatDistance = (km: number): string => {
  if (km < 1) return `${Math.round(km * 1000)}m`;
  return `${km.toFixed(1)}km`;
};
