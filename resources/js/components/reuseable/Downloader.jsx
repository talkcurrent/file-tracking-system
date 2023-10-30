import React from 'react';

const Downloader = (url, pdfName) => {
    var a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = pdfName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

export default Downloader;
