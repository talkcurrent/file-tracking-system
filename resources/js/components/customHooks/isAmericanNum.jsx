import React from 'react';

const isAmericanNum = (str) => {
    var strings = str.split('');
    const batch1 = strings.slice(0, 3).join('');
    const batch2 = strings.slice(3, 6).join('');
    const batch3 = strings.slice(6, 10).join('');

    switch (strings.length) {
        case 1: case 2: case 3:
            return `(${batch1}`;
            break;
        // case 3:
        //     return `(${batch1})`;
        //     break;
        case 4: case 5: case 6:
            return `(${batch1})-${batch2}`;
            break;
        // case 6:
        //     return `(${batch1})-${batch2}-`;
        //     break;
        case 7: case 8: case 9: case 10:
            return `(${batch1})-${batch2}-${batch3}`;
            break;

        default:
            return str;
            break;
    }
};

export default isAmericanNum;
