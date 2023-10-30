import React from 'react';

const SQLDateToJSDate = (sqlDate, withTime) => {

    var date = new Date(sqlDate);
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];

    return `${day}-${month}-${year} ${withTime ? `@ ${hour}:${minutes}:${seconds}` : ""}`;
};

export default SQLDateToJSDate;
