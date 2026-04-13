import { motion, AnimatePresence } from 'framer-motion';
import { useLoader } from '../context/LoaderContext';

const LoadingBar = () => {
    const { isLoading } = useLoader();

    // Sphere styles with 3D effect
    const sphereStyle = {
        position: 'absolute',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        top: '50%',
        left: '50%',
        marginTop: '-12px', // half of height
        marginLeft: '-12px', // half of width
    };

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 100000,
                        background: 'rgba(0, 0, 0, 0.8)', // Darker overlay to hide background content
                        backdropFilter: 'blur(10px)', // Stronger blur
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* Rotating Container */}
                    <motion.div
                        style={{
                            width: '100px',
                            height: '100px',
                            position: 'relative',
                        }}
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {/* Blue Sphere (Primary) */}
                        <span style={{
                            ...sphereStyle,
                            background: 'radial-gradient(circle at 30% 30%, #5d5cba, #2D2C7A)',
                            boxShadow: '0 0 15px rgba(45, 44, 122, 0.5)',
                            transform: 'translateY(-35px)', // Top
                        }} />

                        {/* Yellow Sphere (Secondary) */}
                        <span style={{
                            ...sphereStyle,
                            background: 'radial-gradient(circle at 30% 30%, #ffdf70, #E6B627)',
                            boxShadow: '0 0 15px rgba(230, 182, 39, 0.5)',
                            transform: 'translate(30px, 18px)', // Bottom Right
                        }} />

                        {/* White Sphere */}
                        <span style={{
                            ...sphereStyle,
                            background: 'radial-gradient(circle at 30% 30%, #ffffff, #d1d5db)',
                            boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
                            transform: 'translate(-30px, 18px)', // Bottom Left
                        }} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingBar;
