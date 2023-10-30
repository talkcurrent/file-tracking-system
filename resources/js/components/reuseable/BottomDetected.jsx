import React, { useRef, useEffect } from 'react';
import LoadingBtn from './LoadingBtn';

const BottomDetected = (props) => {
    const { getMoreDatas, datas, noMoreDatas, gettingDatas, infoText } = props;

    const bottom = useRef();
    const options = {
        root: props.elem ? props.elem : null,
        rootMargin: props.rootMargin ? props.rootMargin : "0px 0px 100px 0px",
        threshold: 1
    };
    const callback = entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting > 0 || entry.isIntersecting == true) {
                getMoreDatas();
            }
        });
    };
    const observer = new IntersectionObserver(callback, options);
    useEffect(() => {
        if (bottom.current) {
            observer.observe(bottom.current);
        }
    }, []);

    return (
        <div ref={ bottom } className="bottom">
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
        </div>
    );
};

export default BottomDetected;
