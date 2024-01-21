import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css'
import styles from '../styles/Home.module.css'

export interface IHomeProps { }

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>ANNI X BRODIE</h1>
            <img src="images/kibble-front-web.png" alt="kibble palace" />

            <h2 className={styles.dayone}>DAY 1</h2>
            <h3 className={styles.dayone}>university chapel</h3>
            <h3 className={styles.dayone}>the warehouse</h3>

            <h2 className={styles.daytwo}>DAY 2</h2>
            <h3 className={styles.daytwo}>kibble palace</h3>

        </div>
    );
};

export default Home;
