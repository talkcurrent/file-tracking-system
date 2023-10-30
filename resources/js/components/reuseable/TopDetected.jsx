import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import LoadingBtn from './LoadingBtn';

const TopDetected = (props) => {
    const { getMoreDatas, datas, noMoreDatas, gettingDatas, infoText } = props;

    const top = useRef();
    const options = {
        root: props.elem ? props.elem : null,
        rootMargin: props.rootMargin ? props.rootMargin : "100px 0px 0px 0px",
        threshold: 0
    };
    const callback = entries => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0 || entry.isIntersecting == true) {
                //load more message
                getMoreDatas();
            }
        });
    };
    const observer = new IntersectionObserver(callback, options);
    useEffect(() => {
        if (top.current) {
            observer.observe(top.current);
        }
    }, []);

    return (
        <TopDetectedStyle ref={ top }>
            { datas.length ?
                <div style={ { textAlign: "center" } }>
                    { noMoreDatas ?
                        <span>{ infoText }</span>
                        :
                        gettingDatas ?
                            <LoadingBtn text={ "Loading more" }
                                lineHeight={ "unset" } loadMore={ true }
                                fontSize={ "" } fontWeight={ 900 } />
                            : ""
                    }
                </div>
                : ""
            }
        </TopDetectedStyle>
    );
};

export default TopDetected;
const TopDetectedStyle = styled.div`

`;
