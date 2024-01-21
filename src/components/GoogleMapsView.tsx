import React from 'react';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';
import mapStyles from '../styles/mapStyles';
import styles from '../styles/mapStyles.module.css';

export interface Coordinate {
    lat: number;
    lng: number;
}

export interface FlightPath {
    start: Coordinate;
    end: Coordinate;
}

export interface GoogleMapViewProps {
    lat: number;
    lng: number;
    zoom: number;
    flightPathCoordinates: FlightPath[][];
}

const GoogleMapView: React.FC<GoogleMapViewProps> = ({ lat, lng, zoom, flightPathCoordinates }) => {
    const interpolateArcPoints = (start: Coordinate, end: Coordinate, numPoints: number): Coordinate[] => {
        let path: Coordinate[] = [];
        const φ1 = start.lat * Math.PI / 180; // φ, λ in radians
        const φ2 = end.lat * Math.PI / 180;
        const λ1 = start.lng * Math.PI / 180;
        const λ2 = end.lng * Math.PI / 180;
        const Δλ = λ2 - λ1;
        const R = 6371e3; // gives d in meters

        // Calculate midpoint for the curve
        const Bx = Math.cos(φ2) * Math.cos(Δλ);
        const By = Math.cos(φ2) * Math.sin(Δλ);
        const φ3 = Math.atan2(Math.sin(φ1) + Math.sin(φ2), Math.sqrt((Math.cos(φ1) + Bx) * (Math.cos(φ1) + Bx) + By * By));
        const λ3 = λ1 + Math.atan2(By, Math.cos(φ1) + Bx);

        // Calculate distance between the two points
        const d = Math.sqrt((φ2 - φ1) * (φ2 - φ1) + Math.cos(φ1) * Math.cos(φ2) * Δλ * Δλ) * R;

        for (let i = 0; i <= numPoints; i++) {
            const f = i / numPoints;
            const A = Math.sin((1 - f) * d) / Math.sin(d);
            const B = Math.sin(f * d) / Math.sin(d);
            const x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2);
            const y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2);
            const z = A * Math.sin(φ1) + B * Math.sin(φ2);
            const φ = Math.atan2(z, Math.sqrt(x * x + y * y));
            const λ = Math.atan2(y, x);

            // Offset the midpoint by a factor based on the distance to create an arc
            const offsetLat = Math.sin(φ3) * Math.sin(φ) * Math.cos(d / 2) * Math.sin(f * Math.PI);
            const offsetLng = Math.sin(λ3) * Math.sin(λ) * Math.cos(d / 2) * Math.sin(f * Math.PI);
            path.push({
                lat: φ * 180 / Math.PI + offsetLat * 180 / Math.PI,
                lng: λ * 180 / Math.PI + offsetLng * 180 / Math.PI
            });
        }

        return path;
    };

    // Process each flight path to create an array of paths
    const flightPaths = flightPathCoordinates.flatMap(flightPathsGroup =>
        flightPathsGroup.map(flightPath => {
            const numPoints = 10; // Define the number of points in the arc
            return interpolateArcPoints(flightPath.start, flightPath.end, numPoints);
        })
    );

    return (
        <div className={styles.mapContainer}>
            <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY || ''}>
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={{ lat, lng }}
                    zoom={zoom}
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
                        <Polyline
                            key={index}
                            path={path}
                            options={{
                                strokeColor: '#FFFFFFF',
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                            }}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}

export default GoogleMapView;
