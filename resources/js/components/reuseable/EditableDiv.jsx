import React, { useRef, useEffect, useLayoutEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import WordCount from './WordCount';
import ScrollerX from './ScrollerX';

const EditableDiv = (props) => {
    const { windowWidth, position, top, placeholder, width, miniHeight, padding, color, bgc, errorable,
        borderRadius, searchBar, searching, wordLimit, string, limit, searchByCategory,
        handleSearch, handleCategorySelect } = props;

    const [editableempty, seteditableempty] = useState(true);
    const [searchKeys, setsearchKeys] = useState("");
    const [shifted, setshifted] = useState(false);
    const nodeRef = useRef(null);
    const config = { attributes: true, childList: true, subtree: true };

    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.addedNodes.length) {
                handleEditable(false);
            } else {
                handleEditable(true);
            }
        }
    };
    const observer = new MutationObserver(callback);

    useEffect(() => {
        observer.observe(nodeRef.current, config);
        nodeRef.current.focus();
        return () => { observer.disconnect(); };
    }, []);

    useEffect(() => {
        if (windowWidth <= 768 && searchKeys.trim().length) {
            setshifted(true);
        } else {
            setshifted(false);
        }
    }, [searchKeys]);

    const handlePaste = (e) => {
        e.preventDefault();
        var text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
    };

    const handleEditable = (bool) => {
        seteditableempty(bool);
    };
    const handleOninput = (e) => {
        const target = e.target;
        const { textContent } = target;
        setsearchKeys(textContent);
        props.handleOninput(e);
    };

    const handleKeypress = event => {
        if (event.key == "Enter") {
            event.preventDefault();
            props.handleKeypress(e);
        }
    };

    const handleOnClick = (e) => {
        const editable = e.target.querySelector('[contenteditable=true]');

        if (editable) {
            editable.focus();
        }
    };

    return (
        <EditableDivStyle
            position={ position }
            overflow={ props.overflow }
            top={ top }
            editableempty={ editableempty }
            width={ width }
            miniHeight={ miniHeight }
            padding={ padding }
            borderRadius={ borderRadius }
            searching={ searching }
            searchByCategory={ searchByCategory }
            searchBar={ searchBar }
            windowWidth={ windowWidth }
            shifted={ shifted }
        >
            <div
                className="editable-con"
                style={ {
                    boxShadow: `${errorable && editableempty
                        ? "0px -1px 1px 0px whitesmoke, 0px 1px 1px 0px whitesmoke, 1px 0px 1px 0px red, -1px 0px 1px 0px red"
                        : "0px -1px 1px 0px whitesmoke, 0px 1px 1px 0px whitesmoke, 1px 0px 1px 0px #296dad, -1px 0px 1px 0px #296dad"
                        }`,

                } }
            >
                <div className="placeholder">
                    { editableempty && searchKeys.length == 0
                        ? placeholder
                        : "" }
                </div>
                <div className="customTextarea">
                    <ScrollerX
                        handleOnClick={ handleOnClick }
                        bRadius={ "10px" }
                        padding={ "5px 0 0 0" }
                    >
                        <span
                            ref={ nodeRef }
                            className="textarea-custom"
                            onInput={ handleOninput }
                            onKeyPress={ handleKeypress }
                            required
                            suppressContentEditableWarning
                            contentEditable={ true }
                            autoFocus
                            onPaste={ e => handlePaste(e) }
                        ></span>
                    </ScrollerX>
                    { searchByCategory ?
                        <select
                            name="category" id="category"
                            onChange={ e => handleCategorySelect(e) }
                            value={ props.categoryValue }
                        >
                            { props.children }
                        </select>
                        : "" }
                    { searchBar ?
                        <i
                            style={ { color: "#296dad" } }
                            onClick={ e => searching ? {} : handleSearch(e) }
                            className="fas fa-search search-query"

                        ></i>
                        : ""
                    }
                </div>
            </div>
            { wordLimit ?
                <div className="textarea-bottom">
                    <React.Fragment>
                        <small> { `${WordCount(string)}/${limit}  -` }
                            <strong>{ limit }{ " " }</strong> words maximum</small>
                        { WordCount(string) > limit ?
                            <div className="error-report" style={ { color: "red" } }>
                                <small>ERROR! Words must be less than or{ " " }<strong>{ limit }</strong></small>
                            </div>
                            : ""
                        }
                    </React.Fragment>
                </div>
                : "" }
        </EditableDivStyle>
    );
};

export default EditableDiv;
export const EditableDivStyle = styled.span`
    position: ${props => props.position};
    top: ${props => props.top};
    width: 100%;
    border-radius: 10px;
    overflow:${props => props.overflow != "" ? props.overflow : "hidden"} ;
    grid-gap: 5px;
    padding: 1px;
    z-index: 1;
    box-sizing: content-box;
    .editable-con{
        display: grid;
        border-radius: inherit;
        .placeholder {
            grid-row: 1;
            grid-column: 1;
            height: 100%;
            color: rgb(155, 155, 155);
            font-size: ${props => props.windowWidth <= 600 ? "smaller" : "small"};
            background: #f5f5f5;
            font-style: italic;
            font-family: serif;
            border-radius: ${props => (props.borderRadius ? "10px" : "unset")};
            padding: ${props => props.padding};
            display: grid;
            align-items: center;
        }
        .customTextarea {
            position: relative;
            grid-row: 1;
            grid-column: 1;
            display: grid;
            grid-template-columns:  ${props => props.searchBar && !props.shifted && props.searchByCategory ? "9fr 2fr 1fr" : props.searchBar ? "9fr 1fr" : "unset"};
            .textarea-custom {
                align-self: center;
                min-height: ${props => props.miniHeight};
                width: ${props => props.width};
                border: none;
                word-wrap: break-word;
                word-break: break-word;
                border-radius: ${props => props.borderRadius ? "10px" : "unset"};
                color: gray !important;
                line-height: 1.2;
                font-size: ${props => props.windowWidth <= 600 ? "smaller" : "small"};
                background-color: rgb(0, 0, 0, 0) !important;
                padding: ${props => props.padding};
                display: inline-block;
                z-index: 1;
                cursor: text;
    
                /* Standard syntax */
                &:focus {
                    .placeholder {
                        color: rgb(163, 136, 136);
                    }
                    outline: none;
                    outline-width: 0;
                    background-color: ${props =>
        props.editableempty
            ? "rgb(0, 0, 0, 0)"
            : "rgb(238, 238, 238)"};
                }
    
                &:empty:before {
                    content: "\feff";
                    display: block;
                    /* min-height: 10vh; */
                    /* For Firefox */
                }
    
                &:focus:before {
                    color: rgb(156, 18, 18);
                    opacity: 0.4;
                    font-style: italic;
                }
            }
            select{
                border: unset;
                background: whitesmoke;
                color: #296dad;
                caret-color: #296dad;
                &:focus{
                    border: unset;
                    outline: unset;

                }
                position: ${props => props.shifted ? "absolute" : ""};
                right:  ${props => props.shifted ? "31%" : ""};
                box-shadow: ${props => props.shifted ? "0px 2px 4px -1px silver" : ""};
                border-radius: ${props => props.shifted ? "0 0 10px 10px" : ""};
                top: ${props => props.shifted ? "100%" : ""};
                transition: all ease-in-out 0.5s;
            }
            .search-query{
                font-size: large;
                padding: 3px;
                text-align: center;
                cursor: pointer;
            }
        }
    }
    .textarea-bottom{
        padding: 0 5px;
    }
`;