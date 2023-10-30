import React, { useEffect } from 'react';
import NoRecord from './NoRecord';
import Loading from './Loading';
import styled from 'styled-components';

const Response = (props) => {
    const { windowWidth, responsive,
        dataReady, datas,
        gettingData, noRecordText, background,
        height, gap
    } = props;

    return (
        <Resp
            background={ background }
            windowWidth={ windowWidth }
            responsive={ responsive }
            gap={ gap }
            height={ gettingData ? "50px" : "" }
        >
            { dataReady ?
                datas.length ?
                    <React.Fragment>
                        { props.children }
                    </React.Fragment>
                    :
                    <NoRecord>
                        <span>{ noRecordText }</span>
                    </NoRecord>

                : gettingData ?
                    <NoRecord>
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
                    </NoRecord>
                    : ""
            }
        </Resp>
    );
};

export default Response;
export const Resp = styled.section`
    display: grid;
    gap: ${props => props.gap ? props.gap : "0.5rem"};
    grid-auto-rows: max-content;
    background: ${props => props.background};
    height: ${props => props.height};
    font-size: ${props => props.windowWidth < 500 ? "smaller" : ""};
    /* overflow-x: ${props => props.windowWidth < 500 && props.responsive ? "auto" : ""}; */
`;