import React from 'react';
import { Navigate } from 'react-router-dom';

const VideoGalleryPage = () => {
    return <Navigate to="/gallery?tab=videos" replace />;
};

export default VideoGalleryPage;