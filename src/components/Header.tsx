import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/Header.css'; // Adjust the path as necessary
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
    const { t } = useTranslation();
    return (
        <header className="headerContainer">
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? 'active' : undefined}
                        >
                            AXB
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/rsvp"
                            className={({ isActive }) => isActive ? 'active' : undefined}
                        >
                            rsvp
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/journey"
                            className={({ isActive }) => isActive ? 'active' : undefined}
                        >
                            {t('journey')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/explore"
                            className={({ isActive }) => isActive ? 'active' : undefined}
                        >
                            {t('explore')}
                        </NavLink>
                    </li>

                </ul>
            </nav>
            <LanguageSwitcher />
        </header>
    );
};

export default Header;
