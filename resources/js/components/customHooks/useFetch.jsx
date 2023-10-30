import React from 'react';

const useFetch = (url, body, method, formData, signal) => {
    //formData hold a boolean value
    let token = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
    const jsonHeaders = {
        "X-CSRF-TOKEN": token,
        "Content-Type": "application/json",
        Accept: "application/json",
    };
    const formDataHeaders = {
        "X-CSRF-TOKEN": token,
    };
    return fetch(url,
        {
            mode: "cors",
            method: method,
            signal: signal,
            body: body,
            headers: formData ? formDataHeaders : jsonHeaders
        });
};

export default useFetch;
