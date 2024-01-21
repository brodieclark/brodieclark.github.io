import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/Journey.module.css'
import GoogleMapView, { FlightPath } from '../components/GoogleMapsView';


export interface IJourneyProps { }

const Journey: React.FunctionComponent<IJourneyProps> = (props) => {
    useNavigate();
    const { t } = useTranslation();

    const flightPathCoordinates: FlightPath[][] = [
        [
            { start: { lat: 60.3179, lng: 24.9496 }, end: { lat: 51.509865, lng: -0.118092 } },
            // ... other flight paths in this group
        ],
        [
            { start: { lat: 60.3179, lng: 24.9496 }, end: { lat: 51.507, lng: -0.127 } },
            // ... other flight paths in this group
        ],
    ];

    return (
        <div>
            <GoogleMapView
                lat={55.7754045}
                lng={7.9785661}
                zoom={5.21}
                flightPathCoordinates={flightPathCoordinates}
            />
        </div>
    );
};

export default Journey;
