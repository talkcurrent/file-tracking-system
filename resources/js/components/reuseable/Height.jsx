import React from 'react';

const Height = (originalHeight, originalWidth, newWidth) => {
    return (originalHeight / originalWidth) * newWidth;
};

export default Height;