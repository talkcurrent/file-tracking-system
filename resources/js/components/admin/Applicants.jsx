import { capitalize } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AdminContext } from '../index/AdminContext';
import BottomDetected from '../reuseable/BottomDetected';
import FormSelInput from '../reuseable/FormSelInput';
import Response from '../reuseable/Response';
import EachApplication from './EachApplication';

const Applicants = (props) => {
    const a_context = useContext(AdminContext);
    const {
        windowWidth, form, handleSortChange, applications,
        gettingApps, usStates, handleApplications,
        getMoreApplication, noMoreApplications, gettingMoreApps
    } = a_context;

    const [switchEffect, setswitchEffect] = useState(false);
    useEffect(() => {
        a_context.handleApplications("all");
        a_context.getStates();
        return () => { };
    }, []);

    useEffect(() => {
        getMoreApplication();
    }, [switchEffect]);

    const handleEffect = async () => {
        setswitchEffect(prev => !prev);
    };
    return (
        <ApplicantsStyle windowWidth={ windowWidth }>
            <h2 style={ { textAlign: "center", color: "#3f8eab" } }>Applications</h2>
            <Sorter windowWidth={ windowWidth } className={ "sticky" }>
                <FormSelInput
                    label={ "Sort Aplications By State" }
                    handleChange={ (e) => handleApplications(e.target.value) }
                    disabled={ gettingApps }
                    uniqId={ "stortState" }
                    error={ false }
                    justifySelf={ "" }
                >
                    <option value="all">All States</option>
                    { usStates.length ?
                        usStates.map((state, key) => {
                            return (
                                <option key={ key } value={ state.state }>{ `${capitalize(state.state)}` }</option>
                            );
                        })
                        :
                        <option value="">Loading...</option>
                    }
                </FormSelInput>
            </Sorter>
            <div className={ "applicants-body" }>
                <Response
                    responsive={ true }
                    windowWidth={ windowWidth }
                    dataReady={ !gettingApps }
                    datas={ applications }
                    gettingData={ gettingApps }
                    noRecordText={ "No application found yet" }
                >
                    {
                        applications.length ?
                            applications.map(application => {
                                return (
                                    <React.Fragment key={ application.id }>
                                        <EachApplication application={ application } />
                                    </React.Fragment>
                                );
                            })
                            : ""
                    }
                </Response>
                <BottomDetected
                    getMoreDatas={ handleEffect }//function
                    datas={ applications }
                    noMoreDatas={ noMoreApplications }
                    gettingDatas={ gettingMoreApps }
                    infoText={ "No more applications" }
                />
            </div>
        </ApplicantsStyle>
    );
};

export default Applicants;
const ApplicantsStyle = styled.div`
    padding: ${props =>
    (props.windowWidth <= 520 ? "0px 10px 20px 10px" :
        props.windowWidth <= 800 ? "4px 20px 20px 20px" : "4px 30px 20px 30px")
    };
    .applicants-body{
        position: relative;
    }
`;

export const Sorter = styled.section`
    display: grid;
    padding: 20px 0 5px 0;
    grid-auto-flow: ${props => props.windowWidth < 400 ? "row" : "column "};
    z-index: 1;
    align-items: center;
    box-shadow: 0px 6px 5px 0px #a2a2a2;
    background: white;
    button{
        background: #63b385;
        border-radius: 5px;
        color: white;
        &:hover{
            background: green;
        }
    }
`;