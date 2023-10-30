import React, { useEffect, useRef } from 'react';

const usePrevState = (value) => {
    const ref = useRef(value);
    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};

export default usePrevState;
