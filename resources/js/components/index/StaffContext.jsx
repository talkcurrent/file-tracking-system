import { map } from 'lodash';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import MapToArray from '../customHooks/MapToArray';
import useFetch from '../customHooks/useFetch';

export const StaffContext = React.createContext();

export const StaffProvider = (props) => {
    const [applications, setapplications] = useState({

    });
    const [state, setState] = useState({
        staff: {},
        uploadErrorReport: "",
        gettingApps: false,
        gettingMoreApps: false,
        noMoreApplications: false,
        appsSuccess: false,
        sortingApplications: false,
    });
    const [form, setform] = useState({
        sort: "all"
    });

    const [counts, setcounts] = useState({
        applications: "",
        messages: "",
        authenticated: "",
        reports: "",
        broadcasts: "",
    });

    const [windowWidth, setwindowWidth] = useState("");
    const [windowHeight, setwindowHeight] = useState("");

    const [files, setfiles] = useState({
        imgCollections: new Map(),
        imgTemplate: new Map(),
    });


    const controller = React.useRef();
    const getAppointment = useRef();
    const getSec = useRef();
    //keep up with latest state while await requests
    useEffect(() => {
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, []);

    const updateDimensions = () => {
        setwindowHeight(window.innerHeight);
        setwindowWidth(window.innerWidth);
    };

    const handleCancelReq = () => {
        controller.abort();
    };

    const resetSourceMedia = () => {
        setState({
            ...files,
            imgCollections: new Map(),
            imgTemplate: new Map(),
        });
    };
    const handleResetField = (obj) => {
        var newSate = JSON.parse(JSON.stringify(state));

        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const val = obj[key];
                newSate[key] = obj[key];
            }
        }
        setState(newSate);
    };

    const alterField = (field, data) => {
        setState({ ...state, [field]: data });
    };

    const handleSortChange = (e) => {
        const { name, value, files } = e.target;
        const str = value.replace(/\s\s+/g, " ");
        setform({ ...form, [name]: str });
    };

    return (
        <React.Fragment>
            <StaffContext.Provider
                value={ {
                    ...state, ...files, ...applications, form, counts, windowWidth, windowHeight,
                    handleSortChange, handleResetField
                } }
            >
                { props.children }
            </StaffContext.Provider>
        </React.Fragment>
    );
};

export default StaffProvider;
