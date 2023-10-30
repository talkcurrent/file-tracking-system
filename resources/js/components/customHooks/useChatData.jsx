import React, { useState, useEffect } from 'react';

const useChatData = (datas) => {
    const [chartData, setChartData] = useState({ datasets: [], labels: [] });
    const [properties, setproperties] = useState([]);
    const [values, setvalues] = useState([]);

    useEffect(() => {
        if (properties.length && values.length) {
            handleChartData();
        }
        return () => { };
    }, [properties, values]);
    useEffect(() => {
        if (datas.length) {
            var allProps = [];
            var allVals = [];
            var exp;
            var rev;

            datas.forEach(data => {
                const keys = Object.keys(data)[0];
                const vals = Object.values(data)[0];
                allProps.push(keys);
                allVals.push(vals);
            });
            setproperties(allProps);
            setvalues(allVals);
        }
        return () => { };
    }, [datas]);

    const handleChartData = () => {
        //initially is data.expenses or data.revenues == 0,
        //const returns undefined as it may have return false when condition is 0
        //>= 0 is included to find even if 0
        const exp = datas.find(data => data.expenses >= 0);
        const rev = datas.find(data => data.revenues >= 0);

        const netIcome = rev.revenues - exp.expenses;
        const labels = [...properties, "Income"];
        const datasets = [{
            label: " ",
            data: [...values, netIcome],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ]
        }];

        setChartData({ datasets: datasets, labels: labels });
    };
    return chartData;
};

export default useChatData;
