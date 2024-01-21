import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../styles/RSVP.module.css';

const RSPV: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>RSPV</h1>
            <p className={styles.paragraph}>{t('rsvp')}</p>
            <div className={styles.iframeContainer}>
                <iframe
                    src={t('rsvp-form')}
                    className={styles.responsiveIframe}
                >
                    Loading…
                </iframe>
            </div>
        </div >
    );
};

export default RSPV;
