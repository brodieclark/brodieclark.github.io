import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/Explore.module.css'

export interface IExploreProps { }

const Explore: React.FunctionComponent<IExploreProps> = (props) => {
    useNavigate();
    const { t } = useTranslation();
    return (
        <div>
            <img src="images/kibble-interior-small-web.png" alt="kibble palace" />
        </div>
    );
};

export default Explore;
