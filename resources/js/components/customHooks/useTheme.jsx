import React, { useEffect, useState } from 'react';

const useTheme = (props) => {
    const [theme, settheme] = useState(
        {
            color: "rgb(51, 51, 51)",
            background_color: "white",
            background_img: "",
            nav_bgc: "white",
            nav_container: "rgb(0, 92, 195)",
            nav_color: "white",
        });

    useEffect(() => {
        //request to load theme from db
        return () => { };
    }, []);

    return theme;
};

export default useTheme;
