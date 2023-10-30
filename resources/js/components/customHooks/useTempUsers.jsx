import React from 'react';

const useTempUsers = () => {
    const users = [
        { id: 1, firstname: "Enyoojo", lastname: "Akoh", middlename: "", username: "Sirblezed", profilePic: "imageboy.jpg", country: "Nigeria", city: "Abuja" },
        { id: 2, firstname: "Joe", lastname: "John", middlename: "Patrick", username: "Patrick", profilePic: "imageboy.jpg", country: "Fance", city: "Paris" },
        { id: 3, firstname: "Adejo", lastname: "Akoh", middlename: "Onojah", username: "Onojah", profilePic: "imageboy.jpg", country: "Liberia", city: "Free town" },
        { id: 4, firstname: "Ojochide", lastname: "Paul", middlename: "Solomon", username: "Solomon", profilePic: "imagegirl.jpg", country: "USA", city: "New York" },
        { id: 5, firstname: "Grace", lastname: "Dan", middlename: "Israel", username: "Israel", profilePic: "imagegirl.jpg", country: "UK", city: "London" },
        { id: 6, firstname: "Rebecca", lastname: "John", middlename: "Matthew", username: "Matthew", profilePic: "imagegirl.jpg", country: "Germany", city: "Munich" },
        { id: 7, firstname: "Peter", lastname: "Same", middlename: "Francis", username: "Francis", profilePic: "imageboy.jpg", country: "Russia", city: "Moscow" },
        { id: 8, firstname: "Chantel", lastname: "Kefas", middlename: "Author", username: "Author", profilePic: "imagegirl.jpg", country: "Nigeria", city: "Lagos" },
    ];
    return users;
};

export default useTempUsers;
