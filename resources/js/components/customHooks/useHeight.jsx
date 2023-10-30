import React from 'react';

const useHeight = (width, height) => {
    return (height / width) * width;
};

export default useHeight;
