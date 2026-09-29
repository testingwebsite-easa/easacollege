import React, { useState, useEffect } from 'react';
import PageHero from './PageHero';
import API_BASE_URL from '../api';
import { getDomainHeroImage } from '../utils/domainHeroImages';

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
    const rawInitialImage = image || backgroundImage || defaultImage;
    const initialImage = getDomainHeroImage(pageKey, initialTitle, rawInitialImage);

    const [heroData, setHeroData] = useState({
        title: initialTitle,
        subtitle: initialSubtitle,
        image: initialImage
    });

    useEffect(() => {
        const curTitle = title || defaultTitle || '';
        const curSubtitle = subtitle || defaultSubtitle || '';
        const rawImg = image || backgroundImage || defaultImage;
        const resolvedImg = getDomainHeroImage(pageKey, curTitle, rawImg);

        setHeroData({
            title: curTitle,
            subtitle: curSubtitle,
            image: resolvedImg
        });
    }, [pageKey, title, defaultTitle, subtitle, defaultSubtitle, image, backgroundImage, defaultImage]);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/page-heroes/${pageKey}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && (data.pageKey || data.title || data.image)) {
                        setHeroData(prev => {
                            const newTitle = data.title || prev.title;
                            const newSub = data.subtitle || prev.subtitle;
                            const resolvedImg = getDomainHeroImage(pageKey, newTitle, data.image || prev.image);
                            return {
                                title: newTitle,
                                subtitle: newSub,
                                image: resolvedImg
                            };
                        });
                    }
                }
            } catch (err) {
                console.error(`Error fetching hero for ${pageKey}:`, err);
            }
        };

        if (pageKey) fetchHero();
    }, [pageKey]);

    const finalImage = getDomainHeroImage(pageKey, heroData.title, heroData.image);

    return (
        <PageHero
            title={heroData.title}
            subtitle={heroData.subtitle}
            backgroundImage={finalImage}
        />
    );
};

export default GlobalHero;

