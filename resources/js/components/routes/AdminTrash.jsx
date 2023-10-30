import React, { useContext, useEffect } from 'react';
import useViewPort from '../customHooks/useViewPort';
import Column from '../dashboard/Column';
import ColumnCard from '../dashboard/ColumnCard';
import Deleted from '../includes/Deleted';
import WebView from '../includes/WebView';
import { AdminContext } from '../index/AdminContext';
import { AllContext } from '../index/AllContext';
import Loading from '../reuseable/Loading';

const AdminTrash = (props) => {
    const context = useContext(AllContext);
    const { deletedFiles, gettingDeletedFiles } = context;

    useEffect(() => {
        const path_names = location.pathname.split('/');
        if (path_names.includes('super')) {
            context.handleAuthUser("admin");
        } else {
            context.handleAuthUser("staff");
        }
        context.getDeletedFiles();
        return () => { };
    }, []);

    return (
        <WebView
            view={ "trash" }
            context={ context }

        >
            <Column
                color={ "#5a6269" }
                bgc={ "rgb(245 245 245)" }
                fontSize={ useViewPort(["18px", "18px", "20px", "25px"]) }
                iconClass={ "fas fa-trash-alt" }
                header={ "Deleted files" }
            >
                <ColumnCard
                    color={ "#296dad" }
                    bgc={ "white" }
                    fontSize={ useViewPort(["18px", "18px", "20px", "x-large"]) }
                    textShadow={ "1px 1px 2px whitesmoke" }
                    labelShadow={ "1px 1px 2px whitesmoke" }
                    iconClass={ "" }
                    iconColor={ "" }
                    viewable={ false }
                    cardLink={ " " }
                    cardLabel={ "" }
                    labelColor={ "#174320" }
                    cardCount={ "" }
                >
                    {
                        deletedFiles.length ?
                            <React.Fragment>
                                <div className={ "file-header" }>
                                    <div>S/N</div>
                                    <div>File title</div>
                                    <div>Created by</div>
                                    <div>Action buttons</div>
                                </div>
                                <div className="file-container">
                                    { deletedFiles.map((file, key) => {
                                        return (
                                            <React.Fragment key={ key }>
                                                <Deleted
                                                    context={ context }
                                                    file={ file }
                                                    index={ key }
                                                />
                                            </React.Fragment>
                                        );
                                    }) }
                                </div>
                            </React.Fragment>
                            : gettingDeletedFiles ?
                                <Loading
                                    fixed={ false }
                                    loaderPos={ `30%` }
                                    borderRadius={ `3px / 6px` }
                                    contBorderRadius={ "10px" }
                                    transformOrigin={ `1px 10px` }
                                    width={ `1px` }
                                    height={ `6px` }
                                    background={ false }
                                    loaderColor={ "#6b757d" }
                                />
                                :
                                <div style={ { textAlign: "center" } }>No file found!</div>

                    }
                </ColumnCard>
            </Column>
        </WebView>
    );
};

export default AdminTrash;
