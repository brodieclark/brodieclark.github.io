import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api';
import mapStyles from '../styles/mapStyles';
import styles from '../styles/mapStyles.module.css';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface Coordinate {
    lat: number;
    lng: number;
}

export interface FlightPath {
    start: Coordinate;
    end: Coordinate;
}

export interface Location {
    coords: Coordinate;
    url: string;
}

export interface GoogleMapViewProps {
    lat: number;
    lng: number;
    zoom: number;
    flightPathCoordinates: FlightPath[][];
    locations: Location[];
}

const containerStyle = {
    // width: '100vw', // Full width of the viewport
    width: '800px', // Full width of the viewport
    height: '400px', // Fixed height
    marginTop: '100px' // 100 pixels from the top
};

function createBezierArc(start: Coordinate, end: Coordinate, height: number, numPoints: number): Coordinate[] {
    const path: Coordinate[] = [];

    // Calculate the midpoint (linearly)
    const mid: Coordinate = {
        lat: (start.lat + end.lat) / 2,
        lng: (start.lng + end.lng) / 2,
    };

    // Estimate the control point location by elevating the midpoint
    const control: Coordinate = {
        lat: mid.lat + height,
        lng: mid.lng,
    };

    for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;

        // Calculate the quadratic Bézier curve points
        const x = (1 - t) * (1 - t) * start.lat + 2 * (1 - t) * t * control.lat + t * t * end.lat;
        const y = (1 - t) * (1 - t) * start.lng + 2 * (1 - t) * t * control.lng + t * t * end.lng;

        path.push({
            lat: x,
            lng: y
        });
    }

    return path;
}

function debounce(func: (...args: any[]) => void, wait: number): (...args: any[]) => void {
    let timeout: ReturnType<typeof setTimeout> | null;
    return function executedFunction(...args: any[]) {
        const later = () => {
            clearTimeout(timeout!);
            func(...args);
        };
        clearTimeout(timeout!);
        timeout = setTimeout(later, wait);
    };
}

const GoogleMapView: React.FC<GoogleMapViewProps> = ({ lat, lng, zoom, flightPathCoordinates, locations }) => {
    const { t } = useTranslation();
    const [isApiLoaded, setIsApiLoaded] = useState(false); // New state to track API load status
    const mapRef = useRef<google.maps.Map>();

    const flightPaths = flightPathCoordinates.flatMap(flightPathsGroup =>
        flightPathsGroup.map(flightPath => {
            const numPoints = 20;
            return createBezierArc(flightPath.start, flightPath.end, 5.0, numPoints);
        })
    );

    const adjustBounds = useCallback(() => {
        if (mapRef.current) {
            const bounds = new window.google.maps.LatLngBounds();
            flightPaths.forEach(path => path.forEach(coord => bounds.extend(new window.google.maps.LatLng(coord.lat, coord.lng))));
            locations.forEach(location => bounds.extend(new window.google.maps.LatLng(location.coords.lat, location.coords.lng)));
            mapRef.current.fitBounds(bounds, 20);
        }
    }, [flightPaths, locations]);

    useEffect(() => {
        if (isApiLoaded) {
            const debouncedAdjustBounds = debounce(adjustBounds, 100);
            window.addEventListener('resize', debouncedAdjustBounds);
            return () => window.removeEventListener('resize', debouncedAdjustBounds);
        }
    }, [adjustBounds, isApiLoaded]);

    useEffect(() => {
        if (isApiLoaded && mapRef.current) {
            const idleListener = mapRef.current.addListener('idle', adjustBounds);
            adjustBounds(); // Adjust bounds when map loads
            return () => window.google.maps.event.removeListener(idleListener);
        }
    }, [adjustBounds, isApiLoaded]);

    return (
        <div>
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}
                language={t('language')}
                onLoad={() => setIsApiLoaded(true)} // Set isApiLoaded to true once API is loaded
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{ lat, lng }}
                    zoom={zoom}
                    onLoad={(map) => {
                        mapRef.current = map;
                    }}
                    options={{
                        styles: mapStyles,
                        mapTypeControl: false,
                        zoomControl: false,
                        fullscreenControl: false,
                        streetViewControl: false,
                        scaleControl: false,
                        rotateControl: false,
                        draggable: false,
                        disableDoubleClickZoom: false,
                        keyboardShortcuts: false,
                    }}
                >
                    {flightPaths.map((path, index) => (
                        <Polyline key={index} path={path} options={{ strokeColor: '#FFFFFF', strokeOpacity: 0.8, strokeWeight: 2 }} />
                    ))}
                    {locations.map((location, index) => (
                        <Marker key={index} position={{ lat: location.coords.lat, lng: location.coords.lng }} icon={{ url: location.url }} />
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}

export default GoogleMapView;
