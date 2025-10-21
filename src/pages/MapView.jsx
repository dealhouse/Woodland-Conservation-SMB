import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix missing default marker icons in Vite builds
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

function FitBoundsOnData({ data }) {
    const map = useMap();
    useEffect(() => {
    if (!data) return;
    const layer = L.geoJSON(data);
    const b = layer.getBounds();
    if (b.isValid()) map.fitBounds(b.pad(0.2));
    }, [data, map]);
    return null;
}

export default function MapView() {
    const [geojson, setGeojson] = useState(null);

    useEffect(() => {
        (async () => {
      const res = await axios.get('/api/sightings'); // Django endpoint
      const rdata = res.data
      setGeojson(rdata);
    })().catch(console.error);
    }, []);

  // Halifax-ish fallback center; FitBounds will override once data loads
    const center = [44.6488, -63.5752];

    return (
    <div style={{ height: "100vh", width: "100%" }}>
        <MapContainer center={center} zoom={11} style={{ height: "100%", width: "100%" }}>
        <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render points as markers (optional; Leaflet can render default) */}
        {geojson && (
            <GeoJSON
            data={geojson}
            pointToLayer={(_feature, latlng) => L.marker(latlng)}
            />
        )}

        {geojson && <FitBoundsOnData data={geojson} />}
        </MapContainer>
    </div>
    );
}
