import React, { useEffect, useRef } from 'react';

const useDownload = (href, download) => {
    var a = document.createElement('a');
    a.href = href;
    a.download = download;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    return;
};

export default useDownload;