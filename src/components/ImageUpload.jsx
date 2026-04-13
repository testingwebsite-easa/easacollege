import React, { useState, useRef } from 'react';
import API_BASE_URL from '../api';

const ImageUpload = ({ value, onUpload, placeholder = "Drag & Drop Image or Click to Upload", accept = "image/*" }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(value);
    const fileInputRef = useRef(null);

    const handleFile = async (file) => {
        if (!file) return;

        // Preview logic
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            // For PDFs or other files, we can't show a direct preview image from FileReader easily
            // just set the preview to null or a placeholder if we want to indicate selection, 
            // but here we rely on the final URL or just 'Uploading...' state.
            setPreview(null);
        }

        // Upload
        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/upload`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log("Upload API Response:", data); // Debugging
            if (data.url) {
                onUpload(data.url);
                setPreview(data.url); // Set preview to the returned URL (Cloudinary URL)
            }
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed");
            setPreview(value); // Revert on failure
        } finally {
            setUploading(false);
        }
    };

    const isPdf = (url) => url && url.toString().toLowerCase().endsWith('.pdf');

    React.useEffect(() => {
        setPreview(value);
    }, [value]);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const onDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div
                onClick={handleClick}
                onDrop={onDrop}
                onDragOver={onDragOver}
                style={{
                    border: '2px dashed var(--glass-border)',
                    borderRadius: '12px',
                    padding: '1rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.02)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    minHeight: '150px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}
                className="image-upload-area"
            >
                {preview && !isPdf(preview) ? (
                    <img
                        src={preview}
                        alt="Preview"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '200px',
                            objectFit: 'contain',
                            borderRadius: '8px'
                        }}
                    />
                ) : preview && isPdf(preview) ? (
                    <div style={{ color: 'var(--text-main)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        <span>PDF File Uploaded</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{preview.split('/').pop()}</span>
                    </div>
                ) : (
                    <div style={{ color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        <span>{placeholder}</span>
                    </div>
                )}

                {uploading && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold'
                    }}>
                        Uploading...
                    </div>
                )}
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleFile(e.target.files[0])}
                style={{ display: 'none' }}
                accept={accept}
            />
        </div>
    );
};

export default ImageUpload;
