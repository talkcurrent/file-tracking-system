import React from 'react';

const WordCount = (string) => {
    return string == "" ? 0 : string.split(" ").length;
};

export default WordCount;
