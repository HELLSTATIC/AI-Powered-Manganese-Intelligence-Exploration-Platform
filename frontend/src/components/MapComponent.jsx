import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Rectangle, LayersControl, LayerGroup } from 'react-leaflet';
import L from 'leaflet';
import { Pickaxe, ShieldAlert, Layers } from 'lucide-react';

// Custom Pickaxe Leaflet Marker Icon
const createPickaxeIcon = (color = '#10b981') => {
  return L.divIcon({
    className: 'custom-pickaxe-icon',
    html: `
      <div style="
        background: #0f172a;
        border: 2px solid ${color};
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m14 7 3-3 3 3-3 3"/>
          <path d="m5 16 3-3 3 3-3 3"/>
          <path d="m17 7-6.5 6.5"/>
          <path d="m2 22 7-7"/>
        </svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const MapComponent = ({ mines = [], candidateZones = [] }) => {
  const cartoApiKey = import.meta.env.VITE_CARTO_API_KEY;
  const cartoUrl = cartoApiKey && cartoApiKey !== 'YOUR_CARTO_KEY'
    ? `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=${cartoApiKey}`
    : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

  const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  // Bhandara study area bounds (Lat ~21.2 to 21.8, Lon ~79.2 to 80.2)
  const bhandaraBounds = [
    [21.2000, 79.2000],
    [21.9000, 80.4000]
  ];

  return (
    <div className="w-full h-full min-h-[550px] rounded-xl overflow-hidden border border-slate-800 relative glass-panel">
      <MapContainer
        center={[21.25, 79.75]}
        zoom={6}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="CARTO Dark Matter (Primary)">
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url={cartoUrl}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap Standard (Fallback)">
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url={osmUrl}
            />
          </LayersControl.BaseLayer>

          {/* Active Mines Layer */}
          <LayersControl.Overlay checked name="Active Manganese Mines">
            <LayerGroup>
              {mines.map((mine) => (
                <Marker
                  key={mine._id || mine.name}
                  position={[mine.latitude, mine.longitude]}
                  icon={createPickaxeIcon('#10b981')}
                >
                  <Popup>
                    <div className="p-3 max-w-xs space-y-2 font-sans">
                      <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
                        <h4 className="font-bold text-sm text-emerald-400 font-mono">{mine.name}</h4>
                        <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded uppercase">
                          {mine.status}
                        </span>
                      </div>
                      <div className="text-xs space-y-1 text-slate-300 font-mono">
                        <p><span className="text-slate-400">Location:</span> {mine.district}, {mine.state}</p>
                        <p><span className="text-slate-400">Production:</span> {mine.annualProductionMT ? mine.annualProductionMT.toLocaleString() : 0} MT/yr</p>
                        <p><span className="text-slate-400">Grade (Mn %):</span> {mine.mnGradePercent}%</p>
                        <p><span className="text-slate-400">Estimated Reserve:</span> {mine.estimatedReserveMT ? (mine.estimatedReserveMT / 1000000).toFixed(2) : 0} MT</p>
                        <p><span className="text-slate-400">Mine Type & Depth:</span> {mine.mineType || 'Underground'} ({mine.depthMeters || 300}m)</p>
                        <p><span className="text-slate-400">Operator:</span> {mine.operator}</p>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>

          {/* Candidate Exploration Zones Layer */}
          <LayersControl.Overlay checked name="ML Candidate Exploration Targets">
            <LayerGroup>
              {candidateZones.map((zone) => {
                const color = zone.priority === 'HIGH' ? '#10b981' : (zone.priority === 'MEDIUM' ? '#f59e0b' : '#ef4444');
                const radius = Math.max(Math.min((zone.area_hectares || zone.areaHectares || 1000) / 100, 24), 10);

                return (
                  <CircleMarker
                    key={zone.zone_id || zone.zoneId || zone.name}
                    center={[zone.latitude, zone.longitude]}
                    radius={radius}
                    pathOptions={{
                      color: color,
                      fillColor: color,
                      fillOpacity: 0.35,
                      weight: 2
                    }}
                  >
                    <Popup>
                      <div className="p-3 max-w-xs space-y-2 font-sans">
                        <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
                          <h4 className="font-bold text-sm text-slate-100 font-mono">{zone.zone_id || zone.zoneId}</h4>
                          <span
                            className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase"
                            style={{ backgroundColor: `${color}25`, color: color, border: `1px solid ${color}50` }}
                          >
                            {zone.priority} Priority
                          </span>
                        </div>
                        <div className="text-xs space-y-1.5 text-slate-300 font-mono">
                          <p className="font-semibold text-slate-200">{zone.name}</p>
                          <p><span className="text-slate-400">Location:</span> {zone.location}</p>
                          <p><span className="text-slate-400">Coordinates:</span> {zone.latitude.toFixed(4)}, {zone.longitude.toFixed(4)}</p>
                          <p><span className="text-slate-400">Area & Pixels:</span> {zone.area_hectares || zone.areaHectares} Ha ({zone.pixel_count || zone.pixelCount || 1000} px)</p>

                          <div className="grid grid-cols-2 gap-1 bg-slate-900/90 p-2 rounded border border-slate-800 text-[10px]">
                            <div><span className="text-slate-400">Mean MNI:</span> <span className="text-emerald-400 font-bold">{zone.mean_mni || zone.meanMNI}</span></div>
                            <div><span className="text-slate-400">Mean NDVI:</span> <span className="text-cyan-400 font-bold">{zone.mean_ndvi || zone.meanNDVI}</span></div>
                            <div><span className="text-slate-400">Mean IOI:</span> <span className="text-amber-400 font-bold">{zone.mean_ioi || zone.meanIOI}</span></div>
                            <div><span className="text-slate-400">Mean CMI:</span> <span className="text-purple-400 font-bold">{zone.mean_cmi || zone.meanCMI}</span></div>
                          </div>

                          <div className="text-[11px] text-slate-300 leading-snug pt-1 border-t border-slate-800">
                            <span className="text-emerald-400 font-semibold">Recommendation:</span> {zone.recommendation}
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}
            </LayerGroup>
          </LayersControl.Overlay>

          {/* Bhandara Study Area Focus Boundary */}
          <LayersControl.Overlay checked name="Bhandara Study Boundary">
            <Rectangle
              bounds={bhandaraBounds}
              pathOptions={{ color: '#06b6d4', weight: 1.5, dashArray: '6, 6', fillOpacity: 0.05 }}
            />
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>

      {/* Floating Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] glass-panel p-3 rounded-lg border border-slate-800 text-xs font-mono space-y-1.5 max-w-xs shadow-2xl">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-1">
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-bold uppercase tracking-wider text-slate-200 text-[10px]">Exploration Legend</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block border border-emerald-400"></span>
          <span className="text-slate-300">HIGH Potential Target</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block border border-amber-400"></span>
          <span className="text-slate-300">MEDIUM Potential Target</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-rose-500 inline-block border border-rose-400"></span>
          <span className="text-slate-300">LOW Priority Target</span>
        </div>
        <div className="flex items-center space-x-2 pt-1 border-t border-slate-800/60">
          <Pickaxe className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-300">Active MOIL / State Mine</span>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
