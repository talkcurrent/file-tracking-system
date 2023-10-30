import React, { useEffect, useState } from 'react';

const useViewPort = (pixels) => {
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, []);

    const updateDimensions = () => {
        setwindowWidth(window.innerWidth);
    };

    if (windowWidth <= 400) {
        return pixels[0];
    }
    if (windowWidth <= 500) {
        return pixels[1];
    }
    if (pixels[2] && windowWidth <= 768) {
        return pixels[2];
    }
    if (pixels[3] && windowWidth <= 900) {
        return pixels[3];
    }
    if (pixels[4] && windowWidth <= 1280) {
        return pixels[4];
    }
    if (pixels[5]) {
        return pixels[5];
    }
    return pixels[pixels.length - 1];
};

export default useViewPort;
