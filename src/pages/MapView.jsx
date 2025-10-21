import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import axios from "axios";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { defaultIcon } from "../leaflet-icon";

// hardcoded test marker (should appear no matter what)


// Fix missing default marker icons in Vite builds


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

const EMPTY_FC = { type: "FeatureCollection", features: [] };
const isFC = (d) => d && d.type === "FeatureCollection" && Array.isArray(d.features);
export default function MapView() {
    
  const [sightings, setSightings] = useState(EMPTY_FC);           // you already have this
  const [locations, setLocations] = useState(EMPTY_FC);  

  // for sightings (label = species)
const onEachSighting = (feature, layer) => {
  const label = feature?.properties?.species || "Sighting";
  layer.bindTooltip(label, {
    permanent: true,
    direction: "top",
    offset: [0, -12],
    className: "map-label sightings-label",
  });
};

// for important locations (label = name)
const onEachLocation = (feature, layer) => {
  const label = feature?.properties?.name || "Location";
  layer.bindTooltip(label, {
    permanent: true,
    direction: "top",
    offset: [0, -12],
    className: "map-label locations-label",
  });
};


    useEffect(() => {
        (async () => {
      const res = await axios.get('/api/sightings'); // Django endpoint
      const rdata = res.data
      setSightings(rdata);
      console.log(rdata);
    })().catch(console.error);
    }, []);

    useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/important-locations/"); // trailing slash
        setLocations(isFC(data) ? data : EMPTY_FC);
        console.log(data);
      } catch {
        setLocations(EMPTY_FC);
      }
    })();
  }, []);
  // Halifax-ish fallback center; FitBounds will override once data loads
    const center = [44.6488, -63.5752];

    return (
    <div style={{ height: "100vh", width: "100%" }}>
        <MapContainer center={[44.6488, -63.5752]} zoom={11} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors" />

      {/* Hardcoded test pin so you can see an icon immediately */}
      <Marker position={[44.6488, -63.5752]} icon={defaultIcon} />

      {/* Your GeoJSON layer using the same icon */}
      {sightings?.features?.length > 0 && (
        <GeoJSON
          data={sightings}
          pointToLayer={(_f, latlng) => L.marker(latlng, { icon: defaultIcon })}
          onEachFeature={onEachSighting}
        />
      )}
      {locations.features.length > 0 && (
        <GeoJSON
          data={locations}
          pointToLayer={(_f, latlng) => L.marker(latlng, { icon: defaultIcon })}
          onEachFeature={onEachLocation}
        />
      )}
    </MapContainer>
    </div>
    );
}
