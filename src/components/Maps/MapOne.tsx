"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { useLocation } from '@/components/contexts/LocationContext';
import mapAirQualityData from './mapAirQualityData.json';

const getAqiColor = (aqi: number): string => {
  if (aqi <= 50) return 'green';
  if (aqi <= 100) return 'yellow';
  if (aqi <= 150) return 'orange';
  if (aqi <= 200) return 'red';
  if (aqi <= 300) return 'purple';
  return 'maroon';
};

const MapOne: React.FC = () => {
  const { lat, lng } = useLocation();
  const mapRef = useRef<Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [selectedStationData, setSelectedStationData] = useState<any>(null);

  const initializeMap = useCallback(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const initialMap = new Map({
      target: mapContainerRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([lng || 0, lat || 0]),
        zoom: 5,
      }),
    });

    mapRef.current = initialMap;

    // Add click event listener to the map
    initialMap.on('click', (event) => {
      const clickedCoord = initialMap.getCoordinateFromPixel(event.pixel);
      const lonLat = fromLonLat(clickedCoord, 'EPSG:3857');
      setSelectedLocation([lonLat[0], lonLat[1]]);
      initialMap.getView().setCenter(clickedCoord);
      initialMap.getView().setZoom(10);

      // Find the nearest station
      const nearestStation = mapAirQualityData.reduce((nearest, station) => {
        const stationCoord = fromLonLat([station.Longitude, station.Latitude]);
        const distance = Math.sqrt(
          Math.pow(stationCoord[0] - clickedCoord[0], 2) +
          Math.pow(stationCoord[1] - clickedCoord[1], 2)
        );
        return distance < nearest.distance ? { station, distance } : nearest;
      }, { station: null as any, distance: Infinity });

      setSelectedStationData(nearestStation.station);
    });
  }, [lat, lng]);

  const addMarkers = useCallback(() => {
    if (!mapRef.current) return;

    if (markerLayerRef.current) {
      mapRef.current.removeLayer(markerLayerRef.current);
    }

    const vectorSource = new VectorSource();

    mapAirQualityData.forEach((station) => {
      const marker = new Feature({
        geometry: new Point(fromLonLat([station.Longitude, station.Latitude])),
      });

      marker.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 12,
            fill: new Fill({ color: getAqiColor(station.AQI) }),
            stroke: new Stroke({ color: 'white', width: 2 }),
          }),
          text: new Text({
            text: station.AQI.toString(),
            fill: new Fill({ color: '#000' }),
            stroke: new Stroke({ color: '#fff', width: 2 }),
            offsetY: -20,
            font: '14px Arial',
          }),
        })
      );

      vectorSource.addFeature(marker);
    });

    // Add marker for selected location
    if (selectedLocation) {
      const selectedMarker = new Feature({
        geometry: new Point(fromLonLat(selectedLocation)),
      });

      selectedMarker.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 15,
            fill: new Fill({ color: 'blue' }),
            stroke: new Stroke({ color: 'white', width: 2 }),
          }),
        })
      );

      vectorSource.addFeature(selectedMarker);
    }

    const markerLayer = new VectorLayer({
      source: vectorSource,
    });

    mapRef.current.addLayer(markerLayer);
    markerLayerRef.current = markerLayer;
  }, [selectedLocation]);

  useEffect(() => {
    initializeMap();
  }, [initializeMap]);

  useEffect(() => {
    if (mapRef.current) {
      addMarkers();
    }
  }, [addMarkers, selectedLocation]);

  useEffect(() => {
    if (mapRef.current && lat !== null && lng !== null) {
      const center = fromLonLat([lng, lat]);
      mapRef.current.getView().setCenter(center);
      mapRef.current.getView().setZoom(10);
      setSelectedLocation([lng, lat]);
    }
  }, [lat, lng]);

  if (lat === null || lng === null) {
    return <div>Please select a location or sign in to view the map.</div>;
  }

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mb-4">
        <h4 className="text-xl font-semibold text-black dark:text-white">Air Quality Map</h4>
      </div>
      <div className="relative h-[400px] w-full">
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
      </div>
      {selectedLocation && (
        <div className="mt-4">
          <p>Selected Location: {selectedLocation[1].toFixed(4)}°N, {selectedLocation[0].toFixed(4)}°E</p>
          {selectedStationData && (
            <div className="mt-2">
              <p>Nearest Station: {selectedStationData.Station}</p>
              <p>AQI: {selectedStationData.AQI} ({selectedStationData.AQI_Quality})</p>
              <p>City: {selectedStationData.City}, {selectedStationData.State}</p>
              {/* <p>Last Updated: {selectedStationData.Pol_Date}</p> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MapOne;