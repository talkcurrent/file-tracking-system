import React from 'react';

const InArray = (key, arr) => {

    const arrayCompare = (a1, a2) => {
        if (a1.length != a2.length) return false;
        var length = a2.length;
        for (var i = 0; i < length; i++) {
            if (a1[i] !== a2[i]) return false;
        }
        return true;
    };

    var length = arr.length;
    for (var i = 0; i < length; i++) {
        if (typeof arr[i] == 'object') {
            if (arrayCompare(arr[i], key)) return true;
        } else {
            if (arr[i] == key) return true;
        }
    }
    return false;
};

export default InArray;
