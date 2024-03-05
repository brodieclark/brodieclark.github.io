import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css'
import styles from '../styles/Home.module.css'
import GoogleMapView, { FlightPath, Location } from '../components/GoogleMapsView';


export interface IHomeProps { }

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    const navigate = useNavigate();

    const location: Location[] = [
        { coords: { lat: 55.87160613264678, lng: -4.289749671577372 }, url: "icons/glasgowchapel.png" },
        { coords: { lat: 55.86480263466177, lng: -4.299624115497312 }, url: "icons/factory.png" },
        { coords: { lat: 55.878865936598594, lng: -4.288238945185791 }, url: "icons/palmtree.png" },
    ];

    return (
        <div>
            <div>
                <h1>ANNI X BRODIE</h1>
                <img src="images/kibble-front-web.png" alt="kibble palace" />

                <h2 className={styles.dayone}>DAY 1</h2>
                <h3 className={styles.dayone}>university chapel</h3>
                <h3 className={styles.dayone}>the warehouse</h3>

                <h2 className={styles.daytwo}>DAY 2</h2>
                <h3 className={styles.daytwo}>kibble palace</h3>
            </div>
            <div className="map-view" style={{ marginTop: '20px' }}> {/* Adjust width and marginTop as needed */}
                <GoogleMapView
                    lat={55.87160613264678}
                    lng={-4.289749671577372}
                    zoom={13.5}
                    flightPathCoordinates={[]}
                    locations={location}
                />
            </div>

        </div>
    );
};

export default Home;
