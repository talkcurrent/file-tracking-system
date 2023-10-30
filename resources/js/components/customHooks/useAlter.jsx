import React from 'react';

function useAlter(obj, alterProp, alterVal, stmt) {
    /**@obj object to alter */
    var newObj = JSON.parse(JSON.stringify(obj));
    switch (stmt) {
        case "increment":
            newObj[alterProp] += 1;
            break;
        case "decrement":
            newObj[alterProp] -= 1;
            break;
        default:
            newObj[alterProp] = alterVal;
            break;
    }

    return newObj;
};

export default useAlter;
