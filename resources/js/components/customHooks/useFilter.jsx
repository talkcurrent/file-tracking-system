import React from 'react';

function useFilter(id, object) {
    var newObj = JSON.parse(JSON.stringify(object));
    //get the media object
    var filtered = newObj.filter(obj => obj.id != id);
    return filtered;
}

export default useFilter;
