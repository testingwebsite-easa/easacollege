import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEO = ({ title, description, keywords, image, url, type = 'website', schema }) => {
    const siteTitle = 'EASA College of Engineering and Technology';
    // A blend of professional and modern "Gen Z" messaging
    const defaultDescription = 'EASA College of Engineering and Technology - Where innovation meets vibe. 🚀 Empowering future engineers with world-class education, top-tier placements, and a campus life that hits different. #EASA #Engineering #FutureReady';

    // Mix of standard SEO keywords and trending terms
    const defaultKeywords = 'EASA College, Engineering, Technology, Coimbatore, Best Engineering College, B.E, B.Tech, Artificial Intelligence, Robotics, Campus Vibe, Student Life, Innovation Hub, Future Tech, Top Placements, Engineering Careers';

    const defaultImage = '/logo.png';
    const siteUrl = 'https://easacollege.ac.in';
    const themeColor = '#0f172a'; // Dark modern theme color for text bubbles etc on mobile

    const currentTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const currentDescription = description || defaultDescription;
    const currentUrl = url || siteUrl;
    const currentImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}${defaultImage}`;

    // Default Schema for College
    const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "CollegeOrUniversity",
        "name": "EASA College of Engineering and Technology",
        "url": siteUrl,
        "logo": `${siteUrl}/logo.png`,
        "sameAs": [
            "https://www.facebook.com/easacollege",
            "https://www.instagram.com/easacollege",
            "https://www.linkedin.com/school/easacollege",
            "https://twitter.com/easacollege"
        ],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "NH-47, Palakkad Main Road, Navakkarai",
            "addressLocality": "Coimbatore",
            "addressRegion": "Tamil Nadu",
            "postalCode": "641105",
            "addressCountry": "IN"
        },
        "description": defaultDescription
    };

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{currentTitle}</title>
            <meta name='description' content={currentDescription} />
            <meta name='keywords' content={keywords || defaultKeywords} />
            <meta name="theme-color" content={themeColor} />

            {/* Open Graph / Facebook / WhatsApp - The "Visual" SEO */}
            <meta property='og:site_name' content="EASA College" />
            <meta property='og:type' content={type} />
            <meta property='og:url' content={currentUrl} />
            <meta property='og:title' content={currentTitle} />
            <meta property='og:description' content={currentDescription} />
            <meta property='og:image' content={currentImage} />
            <meta property='og:image:alt' content={currentTitle} />

            {/* Twitter Card - Large images for that "Gen Z" feed appeal */}
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:url' content={currentUrl} />
            <meta name='twitter:title' content={currentTitle} />
            <meta name='twitter:description' content={currentDescription} />
            <meta name='twitter:image' content={currentImage} />
            <meta name='twitter:creator' content="@easacollege" />

            {/* Canonical */}
            <link rel="canonical" href={currentUrl} />

            {/* Structured Data (JSON-LD) - The "Smart" SEO */}
            <script type="application/ld+json">
                {JSON.stringify(schema || defaultSchema)}
            </script>
        </Helmet>
    );
};

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
    type: PropTypes.string,
    schema: PropTypes.object
};

export default SEO;
