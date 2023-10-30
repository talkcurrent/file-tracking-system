import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Table = (props) => {
    const [header, setheader] = useState("");
    const head = React.createRef();
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1
    };
    const callback = entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting < 1 || entry.isIntersecting == false) {
                setheader("header");
            } else {
                setheader("");
            }
        });
    };
    const observer = new IntersectionObserver(callback, options);
    useEffect(() => {
        if (head.current) {
            observer.observe(head.current);
        }
    }, []);
    const { windowWidth, heads, minWith, hRule, columns, nthChildBgc } = props;
    return (
        <TableStyled
            windowWidth={ windowWidth }
            nthChildBgc={ nthChildBgc }
            minWith={ minWith }
            columns={ columns }>
            { heads.length ?
                <React.Fragment>
                    <div className={ `theader ${header}` } ref={ head }>
                        { heads.map((head, key) => {
                            return (
                                <React.Fragment key={ key }>
                                    <div className={ `${key > 0 ? "seperator" : ""}` }>
                                        <strong>{ head }</strong>
                                    </div>
                                </React.Fragment>
                            );
                        })
                        }
                    </div>
                    { hRule ? <hr /> : "" }
                </React.Fragment>
                :
                "" }
            <div className="tbody">
                { props.children }
            </div>
        </TableStyled>
    );
};

export default Table;
export const TableStyled = styled.div`
    text-align: center;
    min-width: ${props => props.windowWidth < 500 ? props.minWith : ""};
    font-size: ${props => props.windowWidth < 1000 ? "smaller" : "small"};
    .theader{
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: ${props => props.columns ? `repeat(${props.columns}, 1fr)` : "repeat(6, 1fr)"};
        text-shadow: unset;
        color: black;
        &.header{
            position: sticky;
            top: -2px;
            background: white;
            box-shadow: 0px 4px 5px #a2a2a2, 0px 0px 4px #adb5bd;
        }
    }
    .tbody{
        display: grid;
        grid-gap: 10px;
        .troll{
            display: grid;
            grid-auto-flow: column;
            grid-template-columns: ${props => props.columns ? `repeat(${props.columns}, 1fr)` : "repeat(6, 1fr)"};
            align-items: center;
            padding: 3px 0;
            border-radius: 5px;
            &:nth-child(odd){
                background: ${props => props.nthChildBgc};
            }
            .tooltip-content{
                background: white;
                display: grid;
                grid-gap: 10px;
                max-width: inherit;
                .without-photo{
                    background: transparent;
                    color: #44a2eb;
                    &:hover{
                        background: #44a2eb;
                        color: white;
                    }
                }
                .imp-note{
                    
                }
            }
            .selfie{
                height: 50px;
                width: 50px;
                justify-self: center;
                img{
                    height: 100%;
                    object-fit: cover;
                    cursor: pointer;
                    border-radius: 5px;
                }
            }
        }
    }
    .tfooter{
        display: grid;
        grid-auto-flow: column;
    }
`;

