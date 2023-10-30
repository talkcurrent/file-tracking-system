import React, { useContext, useEffect, useRef, useState } from 'react';
import useFetch from '../customHooks/useFetch';

export const AllContext = React.createContext();

export const AllProvider = (props) => {
    const [applications, setapplications] = useState({

    });
    const [state, setState] = useState({
        isAdmin: window.location.pathname.split('/').includes('super'),
        staff_count: "?",
        file_count: "?",
        archive_count: "?",
        //
        uploadErrorReport: "",
        gettingApps: false,
        gettingMoreApps: false,
        noMoreApplications: false,
        appsSuccess: false,
        sortingApplications: false,
        gettingStaffs: true,
        gettingFaculties: true,
        gettingFiles: true,
        staffsReady: false,
        facultiesReady: false,
        departmentsReady: false,
        filesReady: false,
        previewable: "",

        gettingExpress: true,
        expressFor: "",
        gettingExpressFiles: true,
        expressFilesReady: false,
        expressFilesReady: false,

        gettingArchiveFiles: true,
        gettingDeletedFiles: true,
        restoringFile: false,
    });
    const [state2, setState2] = useState({
        gettingReceivedFiles: true,
        receivedFilesReady: false,
    });
    const [state3, setState3] = useState({
        gettingForwardedFiles: true,
        forwardedFilesReady: false,
    });
    const [counts, setcounts] = useState({
        staff_count: "?",
        file_count: "?",
        archive_count: "?",
    });
    const [form, setform] = useState({
        sort: "all"
    });

    const [renderSwitch, setrenderSwitch] = useState(1);

    const [windowWidth, setwindowWidth] = useState("");
    const [windowHeight, setwindowHeight] = useState("");

    const [files, setfiles] = useState({
        imgCollections: new Map(),
        imgTemplate: new Map(),
    });
    const [authUser, setauthUser] = useState({});
    const [faculties, setfaculties] = useState([]);
    const [departments, setdepartments] = useState([]);
    const [gettingDepartments, setgettingDepartments] = useState(false);
    const [staffs, setstaffs] = useState([]);
    const [allFiles, setallFiles] = useState([]);
    const [fileExpress, setfileExpress] = useState([]);
    const [forwardedFiles, setforwardedFiles] = useState([]);//file i sent
    const [receivedFiles, setreceivedFiles] = useState([]);//file sent to me
    const [archiveFiles, setarchiveFiles] = useState([]);
    const [deletedFiles, setdeletedFiles] = useState([]);
    const [roles, setroles] = useState([]);
    const [expressReady, setexpressReady] = useState(false);

    const controller = React.useRef();
    const getAppointment = useRef();
    const getSec = useRef();
    const getAuthUser = useRef();
    //keep up with latest state while await requests
    useEffect(() => {
        updateDimensions();
        getRoles();
        getCounts();

        window.addEventListener("resize", updateDimensions);
        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, []);
    // useEffect(() => {
    //     setTimeout(() => {
    //         setState({ ...state, expressReady: false });
    //     }, 200);
    // }, [state.expressReady]);
    // useEffect(() => {
    //     console.info(state);
    //     return () => { };
    // }, [state]);

    const updateDimensions = () => {
        setwindowHeight(window.innerHeight);
        setwindowWidth(window.innerWidth);
    };

    const handleCancelReq = () => {
        controller.abort();
    };

    const handleDelPreview = (index) => {
        const imgTemplate = new Map(files.imgTemplate);
        const imgCollections = new Map(files.imgCollections);
        imgTemplate.delete(index);
        imgCollections.delete(index);
        setfiles({
            ...files,
            imgTemplate: imgTemplate,
            imgCollections: imgCollections
        });
    };
    const resetSourceMedia = () => {
        setfiles({
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

    const alterStateProps = (field, data) => {
        setState({ ...state, [field]: data });
    };

    const handleFile = async (event, filesFor) => {
        const target = event.target;
        const inputFiles = target.files;

        setState({
            ...state, previewable: filesFor
        });
        Array.from(inputFiles).forEach(file => {
            var fileName = file.name.split(".").slice(0, (file.name.split(".").length) - 1).join(".");
            const objURL = window.URL.createObjectURL(file);

            setfiles({
                ...files, imgCollections: files.imgCollections.set(fileName, file),
            });
            setfiles({
                ...files, imgTemplate: files.imgTemplate.set(fileName, objURL),
            });
        });

    };

    const handleSortChange = (e) => {
        const { name, value, files } = e.target;
        const str = value.replace(/\s\s+/g, " ");
        setform({ ...form, [name]: str });
    };

    const updloadDp = async () => {
        const { imgCollections } = files;
        setState({ ...state, uploadingDp: true });

        var dataCollections = new FormData();

        for (const [key, value] of imgCollections) {
            dataCollections.append("imgCollections[]", value);
        }
        dataCollections.append("guard", state.isAdmin ? "admin" : "staff");

        const response = await useFetch("/upload_dp", dataCollections, "POST", true);
        if (response.ok) {
            let result = await response.json();
            resetSourceMedia();
            handleAuthUser(state.isAdmin ? "admin" : "staff");
            setState({ ...state, uploadingDp: false });
        } else {
            setState({ ...state, uploadingDp: false });
        }
    };

    const handleAuthUser = async (user) => {
        if (user == "admin") {
            clearTimeout(getAuthUser.current);
            const response = await useFetch("/super/get_super", "", "POST", false);
            if (response.ok) {
                let result = await response.json();
                setauthUser(result);
            } else {
                getAuthUser.current = setTimeout(() => {
                    handleAuthUser('admin');
                }, 60000);
            }
        } else {
            clearTimeout(getAuthUser.current);
            const response = await useFetch("/get_staff", "", "POST", false);
            if (response.ok) {
                let result = await response.json();
                setauthUser(result);
            } else {
                getAuthUser.current = setTimeout(() => {
                    handleAuthUser('staff');
                }, 60000);
            }
        }
    };

    const getCounts = async () => {
        const response = await useFetch("/get_counts", "", "POST", false);
        if (response.ok) {
            let result = await response.json();
            setcounts({
                ...counts,
                staff_count: result.staff_count,
                archive_count: result.archive_count,
                file_count: result.file_count
            });
        } else {
            setTimeout(() => {
                getCounts();
            }, 60000);
        }
    };
    const getStaffs = async () => {
        setState({ ...state, gettingStaffs: true, staffsReady: false });
        const response = await useFetch("/get_staffs", "", "POST", false);
        if (response.ok) {
            let result = await response.json();
            setstaffs(result);
            setState({ ...state, gettingStaffs: false, staffsReady: true });
        } else {
            setState({ ...state, gettingStaffs: false, staffsReady: true });
        }
    };

    const getFaculties = async () => {
        setState({ ...state, gettingFaculties: true, facultiesReady: false });
        const response = await useFetch("/get_faculties", "", "POST", false);
        if (response.ok) {
            let result = await response.json();
            setfaculties(result);
            setState({ ...state, gettingFaculties: false, facultiesReady: true });
        } else {
            setState({ ...state, gettingFaculties: false, facultiesReady: true });
        }
    };

    const getDepartments = async () => {
        setState({ ...state,departmentsReady: false });
        setgettingDepartments(true)
        const response = await useFetch("/get_departments", "", "POST", false);
        if (response.ok) {
            let result = await response.json();
            console.log(result);
            setdepartments(result);
            setgettingDepartments(false)
            setState({ ...state, departmentsReady: true });
        } else {
            setgettingDepartments(false)
        }
    };

    const getFiles = async () => {
        setState({ ...state, gettingFiles: true, filesReady: false });

        const response = await useFetch("/get_files", "", "POST", false);
        if (response.ok) {
            let result = await response.json();
            setallFiles(result);
            setState({ ...state, gettingFiles: false, filesReady: true });
        } else {
            setState({ ...state, gettingFiles: false });
        }
    };

    const getRoles = async () => {

        const response = await useFetch("/get_roles", "", "POST", false);
        if (response.ok) {
            let result = await response.json();
            setroles(result);
        } else {
            setTimeout(() => {
                getRoles();
            }, 6000);
        }
    };
    //file tracker
    const getFileExpress = async (fileId) => {
        const data = {
            id: fileId,
        };

        if (state.expressFor != fileId) {
            setexpressReady(false);
            setState({ ...state, gettingExpress: true, expressFor: fileId });
            const response = await useFetch("/get_file_expresses", JSON.stringify(data), "POST", false);
            if (response.ok) {
                let result = await response.json();
                setexpressReady(true);
                setfileExpress(result);
                setState({ ...state, gettingExpress: false });
            } else {
                setState({ ...state, gettingExpress: false });
            }
        }
    };
    //files i sent
    const getForwardedFiles = async (guard) => {
        const data = { guard: guard };
        setState3({ ...state3, gettingForwardedFiles: true, forwardedFilesReady: false });
        const response = await useFetch("/get_file_forwarded", JSON.stringify(data), "POST", false);
        if (response.ok) {
            let result = await response.json();
            setState3({ ...state3, gettingForwardedFiles: false, forwardedFilesReady: true });
            setforwardedFiles(result);
        } else {
            setState3({ ...state3, gettingForwardedFiles: false });
        }
    };
    //files sent to me
    const getReceivedFiles = async (guard) => {
        const data = { guard: guard };
        setState2({ ...state2, gettingReceivedFiles: true, receivedFilesReady: false });
        const response = await useFetch("/get_file_received", JSON.stringify(data), "POST", false);
        if (response.ok) {
            let result = await response.json();
            setState2({ ...state2, gettingReceivedFiles: false, receivedFilesReady: true });
            setreceivedFiles(result);
        } else {
            setState2({ ...state2, gettingReceivedFiles: false });
        }
    };

    const getArchiveFiles = async () => {

        setState({ ...state, gettingArchiveFiles: true });
        const response = await useFetch("/get_archive_files", '', "POST", false);
        if (response.ok) {
            let result = await response.json();
            setState({ ...state, gettingArchiveFiles: false });
            setarchiveFiles(result);
        } else {
            setState({ ...state, gettingArchiveFiles: false });
        }
    };

    const getDeletedFiles = async () => {

        setState({ ...state, gettingDeletedFiles: true });
        const response = await useFetch("/get_deleted_files", '', "POST", false);
        if (response.ok) {
            let result = await response.json();
            setState({ ...state, gettingDeletedFiles: false });
            setdeletedFiles(result);
        } else {
            setState({ ...state, gettingDeletedFiles: false });
        }
    };

    const handleFileRestore = async (fileId) => {
        const data = {
            id: fileId,
        };

        setState({ ...state, restoringFile: true });
        const response = await useFetch("/restore_file", JSON.stringify(data), "POST", false);
        if (response.ok) {
            let result = await response.json();
            setState({ ...state, restoringFile: false });

            const newDeletedFiles = deletedFiles.filter(file => file.id != fileId);
            setdeletedFiles(newDeletedFiles);
        } else {
            setState({ ...state, restoringFile: false });
        }
    };

    const handleContentUpload = async () => {
        setState({
            ...state,
            uploadingPhoto: true,
            uploadingError: false,
        });
        const { imgCollections } = files;

        var dataCollections = new FormData();

        for (const [key, value] of imgCollections) {
            dataCollections.append("imgCollections[]", value);
        }

        const response = await useFetch("/put_contents", dataCollections, "POST", true);
        if (response.ok) {
            setState({
                ...state,
                uploadingPhoto: false,
                uploadingError: false,
            });
            resetSourceMedia();
        } else {
            setState({
                ...state,
                uploadingPhoto: false,
                uploadingError: true,
            });
        }
        return await response.json();
    };

    return (
        <React.Fragment>
            <AllContext.Provider
                value={ {
                    ...state, ...state2, ...state3, ...counts, ...files, ...applications, renderSwitch, authUser, form, handleDelPreview,
                    staffs, departments, faculties, allFiles, fileExpress, expressReady, renderSwitch,
                    forwardedFiles, receivedFiles, roles, alterStateProps, handleFile, resetSourceMedia,
                    windowWidth, windowHeight, archiveFiles, deletedFiles, getRoles,
                    setstaffs, setdepartments, setfaculties, updloadDp,gettingDepartments,



                    handleAuthUser, handleContentUpload, getFiles, getArchiveFiles,
                    handleSortChange, getStaffs, getFaculties, getDepartments, handleResetField,
                    getFileExpress, getForwardedFiles, getReceivedFiles, getDeletedFiles,
                    handleFileRestore,
                } }
            >
                { props.children }
            </AllContext.Provider>
        </React.Fragment>
    );
};

export default AllProvider;
