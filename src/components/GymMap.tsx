import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Gym, EQUIPMENT_LABELS } from "@/data/gyms";

interface GymMapProps {
  gyms: Gym[];
  selectedGymId?: string | null;
  onGymSelect?: (id: string) => void;
  userLocation?: { lat: number; lng: number };
}

const createMarkerIcon = (level: Gym["equipmentLevel"]) => {
  const colors: Record<string, string> = {
    premium: "hsl(45, 93%, 58%)",
    equipped: "hsl(142, 72%, 50%)",
    basic: "hsl(220, 10%, 55%)",
  };
  const icons: Record<string, string> = { premium: "★", equipped: "◆", basic: "●" };
  const color = colors[level];
  return L.divIcon({
    className: "",
    html: `<div style="background:${color};border:2px solid hsl(220,20%,7%);border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;color:hsl(220,20%,7%);box-shadow:0 0 16px ${color}40;cursor:pointer;transition:transform 0.2s">${icons[level]}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const GymMap = ({ gyms, selectedGymId, onGymSelect, userLocation }: GymMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [48.8606, 2.3376],
      zoom: 13,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    gyms.forEach((gym) => {
      const marker = L.marker([gym.lat, gym.lng], {
        icon: createMarkerIcon(gym.equipmentLevel),
      })
        .addTo(map)
        .bindPopup(
          `<div style="min-width:180px;font-family:Inter,sans-serif">
            <p style="font-weight:700;font-size:14px;margin:0">${gym.name}</p>
            <p style="font-size:12px;opacity:0.7;margin:2px 0">${gym.address}</p>
            <div style="display:flex;align-items:center;gap:4px;margin-top:4px">
              <span style="font-size:12px">⭐ ${gym.rating}</span>
              <span style="font-size:12px;opacity:0.5">·</span>
              <span style="font-size:12px;font-weight:600">${gym.pricePerMonth}€/mois</span>
            </div>
            <p style="font-size:11px;margin-top:4px;opacity:0.7">${EQUIPMENT_LABELS[gym.equipmentLevel]}</p>
          </div>`
        )
        .on("click", () => onGymSelect?.(gym.id));

      markersRef.current.push(marker);
    });
  }, [gyms, onGymSelect]);

  // Fly to selected
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedGymId) return;
    const gym = gyms.find((g) => g.id === selectedGymId);
    if (gym) {
      map.flyTo([gym.lat, gym.lng], 15, { duration: 0.8 });
    }
  }, [selectedGymId, gyms]);

  // User location marker
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !userLocation) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
    } else {
      const userIcon = L.divIcon({
        className: "",
        html: `<div style="width:18px;height:18px;border-radius:50%;background:hsl(217,91%,60%);border:3px solid hsl(0,0%,95%);box-shadow:0 0 12px hsl(217,91%,60%,0.6);animation:pulse-glow 2s ease-in-out infinite"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });
      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon, zIndexOffset: 1000 })
        .addTo(map)
        .bindPopup('<div style="font-family:Inter,sans-serif;font-size:12px;font-weight:600">📍 Vous êtes ici</div>');
    }
  }, [userLocation]);

  // Center map on user location initially
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !userLocation) return;
    map.setView([userLocation.lat, userLocation.lng], 13);
  }, [userLocation?.lat, userLocation?.lng]);

  return <div ref={containerRef} className="w-full h-full rounded-lg" />;
};

export default GymMap;
