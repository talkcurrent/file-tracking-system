import React from 'react';

const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._-]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email.trim());
};

export default isValidEmail;
