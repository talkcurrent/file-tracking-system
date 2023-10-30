import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import LoadingBtn from './LoadingBtn';

const InfoEdit = (props) => {
    const [editable, seteditable] = useState(false);
    const [contentEdited, setcontentEdited] = useState('');
    const [thisFied, setthisFied] = useState(props.field);

    const editableElem = useRef();
    const {
        id, data, field, pos, btnBgc, btnColor,
        top, right, bottom, left, display,
        editing, editingField, contentEditable
    } = props;

    const handlePaste = (e) => {
        e.preventDefault();
        var text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
    };

    const editEnd = async (id, field, table) => {
        if (contentEdited == "" || data.trim() == contentEdited.trim()) {
            seteditable(false);
        } else {
            var response = await props.updateEdited(id, field, contentEdited, table);
            if (response == true) {
                seteditable(false);
            }
        }
    };
    const editStart = () => {
        seteditable(true);
        setTimeout(() => {
            const inputFeild = editableElem.current.textContent;
            const offSet = inputFeild.length;
            if (offSet) {
                const range = document.createRange();
                const sel = window.getSelection();
                range.setStart(editableElem.current.childNodes[0], offSet);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
            editableElem.current.focus();
        }, 100);
    };
    const onInput = (text) => {
        setcontentEdited(text);
    };

    return (
        <InfoEditStyle
            pos={ pos }
            bgc={ btnBgc }
            top={ top }
            right={ right }
            bottom={ bottom }
            left={ left }
            btnColor={ btnColor }
            display={ display }
            padding={ props.padding }
            justifyItems={ props.justifyItems }
        >
            <div className={ editable ? "shade" : "" }><span
                contentEditable={ editable }
                className={ "editable" }
                ref={ editableElem }
                suppressContentEditableWarning
                onPaste={ e => handlePaste(e) }
                onInput={ e => onInput(e.target.textContent) }>{ `${data} ` }</span>{ "  " }</div>
            <span className={ 'carousel-edit-btn' } >

                { editable ?
                    editing ?
                        <button ><LoadingBtn text={ "Updating" } lineHeight={ "unset" }
                            fontSize={ "small" } fontWeight={ 300 } loadMore={ false } /></button>
                        :
                        <button onClick={ e => editEnd(id, field) }>Update</button>

                    : contentEditable ?
                        <i
                            className="far fa-edit"
                            onClick={ e => editStart() }
                            title={ 'Edit field' }
                        ></i>
                        : ""
                }
            </span>
        </InfoEditStyle>
    );
};

export default InfoEdit;
export const InfoEditStyle = styled.div`
    width: ${props => props.width ? props.width : ""};
    display: grid;
    justify-items: ${props => props.justifyItems};
    padding: ${props => props.padding ? props.padding : ""};
    font-family: serif;
    .carousel-edit-btn{
        position: ${props => props.pos};
        cursor: pointer;
        top: ${props => props.top};
        right: ${props => props.right};
        bottom: ${props => props.bottom};
        left: ${props => props.left};
        z-index: 10;
        font-size: small;
        color: #4dc0b5;
        button{
            border-radius: 7px;
            background: ${props => props.bgc};
            color: ${props => props.btnColor};
            font-size: smaller;
            padding: 0 5px;
            margin-right: 0.5rem;
            &:focus{
                outline: none;
            }
        }
    }
    .editable[contenteditable="true"] {
        /* background: #6c757d; */
        color: white;
        font-size: small;
        outline: none;
        border-radius: 5px;
    }
    .shade{
        padding: 0 5px;
        background: #6c757d;
        display: flex;
        border-radius: 10px;
    }
`;
