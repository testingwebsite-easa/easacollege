import React, { useState, useEffect } from 'react';
import PageHero from './PageHero';
import API_BASE_URL from '../api';

const GlobalHero = ({
    pageKey,
    defaultTitle,
    defaultSubtitle,
    defaultImage,
    title,
    subtitle,
    image,
    backgroundImage
}) => {
    const initialTitle = title || defaultTitle || '';
    const initialSubtitle = subtitle || defaultSubtitle || '';
    const initialImage = image || backgroundImage || defaultImage;

    const [heroData, setHeroData] = useState({
        title: initialTitle,
        subtitle: initialSubtitle,
        image: initialImage
    });

    useEffect(() => {
        setHeroData({
            title: title || defaultTitle || '',
            subtitle: subtitle || defaultSubtitle || '',
            image: image || backgroundImage || defaultImage
        });
    }, [title, defaultTitle, subtitle, defaultSubtitle, image, backgroundImage, defaultImage]);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/page-heroes/${pageKey}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.pageKey) {
                        setHeroData(prev => ({
                            title: data.title || prev.title,
                            subtitle: data.subtitle || prev.subtitle,
                            image: data.image || prev.image
                        }));
                    }
                }
            } catch (err) {
                console.error(`Error fetching hero for ${pageKey}:`, err);
            }
        };

        if (pageKey) fetchHero();
    }, [pageKey]);

    return (
        <PageHero
            title={heroData.title}
            subtitle={heroData.subtitle}
            backgroundImage={heroData.image}
        />
    );
};

export default GlobalHero;

