'use client';

import { useEffect, useRef, useState } from 'react';
import { DATA_CENTERS, COURIER_HUBS, type DataCenterFacility, type CourierHub } from '@/lib/solutions-data';
import { TivIcon } from '@/components/shared/tiv-icon';
import { Globe, Layers, Navigation } from 'lucide-react';
import type * as LeafletType from 'leaflet';

export default function OpenStreetMapViewer() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<LeafletType.Map | null>(null);
  const layerGroupRef = useRef<LeafletType.LayerGroup | null>(null);

  const [activeLayer, setActiveLayer] = useState<'both' | 'datacenters' | 'courier'>('both');
  const [selectedRegion, setSelectedRegion] = useState<string>('global');
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Dynamically load leaflet on the client to avoid SSR window errors
    import('leaflet').then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Clean up previous instance if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Initialize Leaflet map instance
      const map = L.map(mapContainerRef.current, {
        center: [22, 10],
        zoom: 2,
        minZoom: 2,
        maxZoom: 14,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      // Add OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors · TIV Network Telemetry',
        maxZoom: 19,
      }).addTo(map);

      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;
      mapInstanceRef.current = map;
      setIsMapReady(true);

      renderMarkers(L, map, layerGroup, activeLayer);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-render markers and routes whenever activeLayer changes
  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current || !layerGroupRef.current) return;
    import('leaflet').then((L) => {
      if (mapInstanceRef.current && layerGroupRef.current) {
        renderMarkers(L, mapInstanceRef.current, layerGroupRef.current, activeLayer);
      }
    });
  }, [activeLayer, isMapReady]);

  const renderMarkers = (
    L: typeof LeafletType,
    map: LeafletType.Map,
    layerGroup: LeafletType.LayerGroup,
    layer: 'both' | 'datacenters' | 'courier'
  ) => {
    layerGroup.clearLayers();

    // 1. Render Data Center Facilities
    if (layer === 'both' || layer === 'datacenters') {
      DATA_CENTERS.forEach((dc) => {
        const loadColor = dc.load < 80 ? '#10b981' : dc.load < 88 ? '#f59e0b' : '#e5484d';
        const markerIcon = L.divIcon({
          className: 'tiv-dc-marker',
          html: `
            <div style="position: relative; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center;">
              <div style="position: absolute; width: 100%; height: 100%; border-radius: 9999px; background-color: ${loadColor}; opacity: 0.3; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              <div style="width: 14px; height: 14px; border-radius: 9999px; background-color: #111113; border: 2px solid ${loadColor}; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 8px ${loadColor};">
                <div style="width: 6px; height: 6px; border-radius: 9999px; background-color: ${loadColor};"></div>
              </div>
            </div>
          `,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
          popupAnchor: [0, -12],
        });

        const popupHtml = `
          <div style="font-family: var(--font-jetbrains), monospace; min-width: 260px; padding: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <div>
                <span style="font-size: 10px; color: #e5484d; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">${dc.region} · DATA CENTER</span>
                <h4 style="font-size: 16px; font-weight: 700; margin: 2px 0 0 0; color: currentColor;">${dc.name}</h4>
                <span style="font-size: 11px; opacity: 0.7;">${dc.country}</span>
              </div>
              <span style="font-size: 11px; background: rgba(229, 72, 77, 0.15); color: #e5484d; padding: 2px 6px; border-radius: 2px; font-weight: 600; border: 1px solid rgba(229, 72, 77, 0.3);">${dc.tier}</span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 11px; margin: 8px 0; padding: 6px 0; border-top: 1px solid rgba(255, 255, 255, 0.1); border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
              <div><span style="opacity: 0.6;">Servers:</span> <strong>${dc.specs.servers.toLocaleString()}</strong></div>
              <div><span style="opacity: 0.6;">Racks:</span> <strong>${dc.specs.racks.toLocaleString()}</strong></div>
              <div><span style="opacity: 0.6;">Power:</span> <strong>${dc.powerCapacity} MW</strong></div>
              <div><span style="opacity: 0.6;">Redundancy:</span> <strong>${dc.redundancy}</strong></div>
              <div><span style="opacity: 0.6;">Load:</span> <strong style="color: ${loadColor};">${dc.load}%</strong></div>
              <div><span style="opacity: 0.6;">Storage:</span> <strong>${(dc.totalStorage / 1000).toFixed(1)} PB</strong></div>
            </div>

            <div style="margin-top: 6px;">
              <span style="font-size: 9px; opacity: 0.6; text-transform: uppercase; display: block; margin-bottom: 3px;">Transit Carriers:</span>
              <div style="display: flex; flex-wrap: wrap; gap: 3px;">
                ${dc.networkProviders.map((p) => `<span style="font-size: 9px; background: rgba(125,125,125,0.15); padding: 1px 4px; border-radius: 2px;">${p}</span>`).join('')}
              </div>
            </div>

            <div style="margin-top: 6px;">
              <span style="font-size: 9px; opacity: 0.6; text-transform: uppercase; display: block; margin-bottom: 3px;">Certifications:</span>
              <div style="display: flex; flex-wrap: wrap; gap: 3px;">
                ${dc.certifications.map((c) => `<span style="font-size: 9px; background: rgba(16,185,129,0.15); color: #10b981; padding: 1px 4px; border-radius: 2px;">${c}</span>`).join('')}
              </div>
            </div>
          </div>
        `;

        const marker = L.marker([dc.lat, dc.lng], { icon: markerIcon });
        marker.bindPopup(popupHtml);
        layerGroup.addLayer(marker);
      });
    }

    // 2. Render Courier Logistics Hubs & Inter-Hub Corridors
    if (layer === 'both' || layer === 'courier') {
      // Connect hub pairs with transit polyline corridors
      for (let i = 0; i < COURIER_HUBS.length; i++) {
        for (let j = i + 1; j < COURIER_HUBS.length; j++) {
          const hubA = COURIER_HUBS[i];
          const hubB = COURIER_HUBS[j];

          // Draw geodesic flight routes
          const polyline = L.polyline(
            [
              [hubA.lat, hubA.lng],
              [hubB.lat, hubB.lng],
            ],
            {
              color: '#e5484d',
              weight: layer === 'courier' ? 1.2 : 0.8,
              opacity: layer === 'courier' ? 0.35 : 0.2,
              dashArray: '4, 8',
            }
          );
          layerGroup.addLayer(polyline);
        }
      }

      // Render Hub Markers
      COURIER_HUBS.forEach((hub) => {
        const hubIcon = L.divIcon({
          className: 'tiv-hub-marker',
          html: `
            <div style="position: relative; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center;">
              <div style="width: 12px; height: 12px; transform: rotate(45deg); background-color: #111113; border: 2px solid #e5484d; box-shadow: 0 0 6px #e5484d;"></div>
              <div style="position: absolute; width: 4px; height: 4px; background-color: #e5484d;"></div>
            </div>
          `,
          iconSize: [18, 18],
          iconAnchor: [9, 9],
          popupAnchor: [0, -10],
        });

        const popupHtml = `
          <div style="font-family: var(--font-jetbrains), monospace; min-width: 250px; padding: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <div>
                <span style="font-size: 10px; color: #e5484d; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">COURIER GATEWAY HUB</span>
                <h4 style="font-size: 15px; font-weight: 700; margin: 2px 0 0 0; color: currentColor;">${hub.name}</h4>
                <span style="font-size: 11px; opacity: 0.7;">${hub.country} · ${hub.region}</span>
              </div>
              <span style="font-size: 11px; background: rgba(16,185,129,0.15); color: #10b981; padding: 2px 6px; border-radius: 2px; font-weight: 600;">48h SLA</span>
            </div>

            <div style="margin: 8px 0; padding: 6px 0; border-top: 1px solid rgba(255, 255, 255, 0.1); border-bottom: 1px solid rgba(255, 255, 255, 0.1); font-size: 11px;">
              <div style="margin-bottom: 4px;"><span style="opacity: 0.6;">Operational Status:</span> <strong style="color: #10b981;">Active Hub</strong></div>
              <div><span style="opacity: 0.6;">Local Carrier Partners:</span> <br/><span style="opacity: 0.9;">${hub.partners.join(' · ')}</span></div>
            </div>

            <div style="display: flex; gap: 4px; margin-top: 6px;">
              ${hub.certifications.map((c) => `<span style="font-size: 9px; background: rgba(229,72,77,0.15); color: #e5484d; padding: 2px 5px; border-radius: 2px;">${c} Verified</span>`).join('')}
            </div>
          </div>
        `;

        const marker = L.marker([hub.lat, hub.lng], { icon: hubIcon });
        marker.bindPopup(popupHtml);
        layerGroup.addLayer(marker);
      });
    }
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    const map = mapInstanceRef.current;
    if (!map) return;

    switch (region) {
      case 'north-america':
        map.flyTo([40, -100], 4, { duration: 1.2 });
        break;
      case 'europe':
        map.flyTo([50, 10], 4, { duration: 1.2 });
        break;
      case 'asia':
        map.flyTo([30, 105], 4, { duration: 1.2 });
        break;
      case 'south-asia':
        map.flyTo([22, 82], 5, { duration: 1.2 });
        break;
      case 'oceania':
        map.flyTo([-30, 140], 4, { duration: 1.2 });
        break;
      default:
        map.flyTo([22, 10], 2, { duration: 1.2 });
        break;
    }
  };

  return (
    <div className="border border-border bg-card">
      {/* Map Header & Controls */}
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <Globe className="h-4 w-4 text-brand" />
          <span className="font-display text-sm font-semibold text-foreground">
            OpenStreetMap Live Global Telemetry
          </span>
          <span className="border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            OSM Tile Engine
          </span>
        </div>

        {/* View and Layer Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Layer Selector */}
          <div className="flex border border-border bg-secondary p-0.5 text-xs font-mono">
            <button
              onClick={() => setActiveLayer('both')}
              className={`px-2.5 py-1 transition-colors ${
                activeLayer === 'both'
                  ? 'bg-brand text-brand-foreground font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All Layers
            </button>
            <button
              onClick={() => setActiveLayer('datacenters')}
              className={`px-2.5 py-1 transition-colors ${
                activeLayer === 'datacenters'
                  ? 'bg-brand text-brand-foreground font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Data Centers (16)
            </button>
            <button
              onClick={() => setActiveLayer('courier')}
              className={`px-2.5 py-1 transition-colors ${
                activeLayer === 'courier'
                  ? 'bg-brand text-brand-foreground font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Courier Hubs (17)
            </button>
          </div>

          {/* Region Quick Zoom Selector */}
          <div className="flex items-center gap-1 border border-border bg-secondary px-2 py-1 text-xs font-mono">
            <Navigation className="h-3 w-3 text-muted-foreground" />
            <select
              value={selectedRegion}
              onChange={(e) => handleRegionChange(e.target.value)}
              className="bg-transparent text-foreground focus:outline-none cursor-pointer"
            >
              <option value="global" className="bg-card text-foreground">Global View</option>
              <option value="north-america" className="bg-card text-foreground">North America</option>
              <option value="europe" className="bg-card text-foreground">Europe</option>
              <option value="asia" className="bg-card text-foreground">East Asia</option>
              <option value="south-asia" className="bg-card text-foreground">South Asia</option>
              <option value="oceania" className="bg-card text-foreground">Oceania</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leaflet OpenStreetMap Container */}
      <div className="relative h-[550px] w-full overflow-hidden bg-background">
        <div ref={mapContainerRef} className="h-full w-full" />

        {/* Legend Overlay */}
        <div className="absolute bottom-4 left-4 z-[400] border border-border bg-card/90 p-3 backdrop-blur font-mono text-[11px] space-y-1.5 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#10b981]" />
            <span className="text-foreground">Data Center (&lt;80% Load)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
            <span className="text-foreground">Data Center (80-87% Load)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#e5484d]" />
            <span className="text-foreground">Data Center (88%+ Load)</span>
          </div>
          <div className="flex items-center gap-2 pt-1 border-t border-border">
            <span className="inline-block h-2 w-2 rotate-45 border border-brand bg-card" />
            <span className="text-foreground">Courier Gateway Hub (17 Nations)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-4 h-0.5 border-t border-dashed border-brand" />
            <span className="text-muted-foreground">48h Flight Route Corridor</span>
          </div>
        </div>
      </div>

      {/* Map Footer Information */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-3 text-xs font-mono text-muted-foreground">
        <div className="flex items-center gap-3">
          <span>Click any marker to inspect real-time node telemetry & carrier partners</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Interactive OpenStreetMap Tile Engine Online</span>
        </div>
      </div>
    </div>
  );
}
