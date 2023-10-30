import React from 'react';

const MapToArray = (props) => {
    const images = [];
    props.size ?
        props.forEach((val, attr) => {
            images.push({ attr: attr, val: val });
        })
        : "";
    return images;
};

export default MapToArray;
