import React, { useState, useEffect } from 'react';
import PageHero from './PageHero';
import API_BASE_URL from '../api';

const GlobalHero = ({ pageKey, defaultTitle, defaultSubtitle, defaultImage }) => {
    const [heroData, setHeroData] = useState({
        title: defaultTitle,
        subtitle: defaultSubtitle,
        image: defaultImage
    });

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/page-heroes/${pageKey}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.pageKey) {
                        setHeroData({
                            title: data.title || defaultTitle,
                            subtitle: data.subtitle || defaultSubtitle,
                            image: data.image || defaultImage
                        });
                    }
                }
            } catch (err) {
                console.error(`Error fetching hero for ${pageKey}:`, err);
            }
        };

        if (pageKey) fetchHero();
    }, [pageKey, defaultTitle, defaultSubtitle, defaultImage]);

    return (
        <PageHero
            title={heroData.title}
            subtitle={heroData.subtitle}
            backgroundImage={heroData.image}
        />
    );
};

export default GlobalHero;
