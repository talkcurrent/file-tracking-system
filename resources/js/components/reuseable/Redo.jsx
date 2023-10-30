import React from 'react';
import styled from 'styled-components';

const Redo = (props) => {
    return (
        <RedoStyle
            top={ props.top }
            onClick={ e => props.handleClick(e) }
        >
            {/* <span>Reload &#8635;</span> */ }
            <span>{ props.btnText }{ " " }<i className="fas fa-redo-alt"></i></span>

        </RedoStyle>
    );
};

export default Redo;
const RedoStyle = styled.div`
    display: grid;
    align-self: center;
    justify-self: center;
    position: relative;
    top: ${props => props.top};
    cursor: pointer;
    box-shadow: 0px 0px 4px 0px #bbc0c5;
    padding: 0 10px;
    .fa-redo-alt{
        font-size: smaller;
    }
`;