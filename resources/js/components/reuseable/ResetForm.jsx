import React from 'react';

const ResetForm = (form) => {
    var copyForm = {};

    for (const key in form) {
        copyForm[key] = "";
    }
    return copyForm;
};

export default ResetForm;
