import React from 'react';

const SlideToggle = (element) => {
    const ch = element.clientHeight,
        sh = element.scrollHeight,
        isCollapsed = !ch,
        noHeightSet = !element.style.height;

    element.style.height = (isCollapsed || noHeightSet ? sh : 0) + "px";
    if (noHeightSet) return slidetoggle.call(this);

};

export default SlideToggle;
