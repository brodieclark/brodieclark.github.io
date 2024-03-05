import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/Journey.module.css'
import GoogleMapView, { FlightPath, Location } from '../components/GoogleMapsView';


export interface IJourneyProps { }

const Journey: React.FunctionComponent<IJourneyProps> = (props) => {
    useNavigate();
    const { t } = useTranslation();

    const flightPathCoordinates: FlightPath[][] = [
        [
            { start: { lat: 60.3179, lng: 24.9496 }, end: { lat: 51.509865, lng: -0.118092 } },
        ],
        [
            { start: { lat: 53.35389, lng: -2.27500 }, end: { lat: 60.3179, lng: 24.9496 } },
        ],
        [
            { start: { lat: 60.3179, lng: 24.9496 }, end: { lat: 55.948547, lng: -3.363355 } },
        ],
    ];

    return (
        <div>
            <GoogleMapView
                lat={55.7754045}
                lng={7.9785661}
                zoom={4.8}
                flightPathCoordinates={flightPathCoordinates}
                locations={[]}
            />
        </div>
    );
};

export default Journey;
