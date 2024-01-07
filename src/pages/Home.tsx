import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/App.css'

export interface IHomeProps { }

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>ANNI X BRODIE</h1>
            <img src="images/kibbel-front-web.png" alt="kibbel palace" />
        </div>
    );
};

export default Home;
