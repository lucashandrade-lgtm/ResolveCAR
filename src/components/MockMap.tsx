import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

const marker = L.divIcon({
  className: "mock-marker",
  html: "<span></span>",
  iconSize: [18, 18],
  iconAnchor: [9, 9]
});

export function MockMap({ center, title }: { center: [number, number]; title: string }) {
  const polygon: [number, number][] = [
    [center[0] + 0.045, center[1] - 0.055],
    [center[0] + 0.035, center[1] + 0.06],
    [center[0] - 0.035, center[1] + 0.045],
    [center[0] - 0.05, center[1] - 0.025]
  ];

  return (
    <MapContainer center={center} zoom={11} scrollWheelZoom={false} className="h-72 w-full rounded border border-slate-200">
      <TileLayer attribution="Mock cartografico" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polygon positions={polygon} pathOptions={{ color: "#1351b4", fillColor: "#168821", fillOpacity: 0.18, weight: 2 }} />
      <Marker position={center} icon={marker}>
        <Popup>{title}</Popup>
      </Marker>
    </MapContainer>
  );
}
