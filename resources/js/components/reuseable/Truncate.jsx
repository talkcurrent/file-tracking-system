import React from 'react';

export const Truncate = (words, number) => {
    var splitted = words.split(" ");
    var res = splitted.slice(0, number).join(" ");
    var truncated;
    if (splitted.length > number) {
        truncated = res + "...";
    } else {
        truncated = res;
    }
    return truncated;
};
export default Truncate;
