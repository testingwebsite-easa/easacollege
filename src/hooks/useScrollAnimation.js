
import { useEffect } from 'react';

const useScrollAnimation = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of element is visible
                rootMargin: '0px 0px -50px 0px' // Offset slightly so it triggers before bottom
            }
        );

        const hiddenElements = document.querySelectorAll('.animate-on-scroll');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            hiddenElements.forEach((el) => observer.unobserve(el));
        };
    }, []);
};

export default useScrollAnimation;
