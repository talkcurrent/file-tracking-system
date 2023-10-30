import React from 'react';
import styled from 'styled-components';

const Column = (props) => {
    const { color, bgc, fontSize, iconClass, header, padding } = props;
    return (
        <ColumnStyle
            color={ color }
            padding={ padding }
            bgc={ bgc }
            fontSize={ fontSize }
        >
            {header ?
                <div className="column-head">
                    <div className="c-head">{ `${header} ` }<i className={ iconClass }></i></div>
                </div>
                : "" }
            <div className="column-cards">
                { props.children }
            </div>
        </ColumnStyle>
    );
};

export default Column;
const ColumnStyle = styled.div`
    border: 1px solid #f3eded;
    padding: ${props => props.padding ? props.padding : "3px 3px"};
    border-radius: 7px;
    display: grid;
    gap: 9px;
    grid-template-rows: max-content;
    .c-head{
        text-align: center;
        background: ${props => props.bgc};
        color: ${props => props.color};
        font-size: ${props => props.fontSize};
        font-weight: bolder;
    }
    .column-cards{
        display:grid;
        gap: 10px;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        grid-auto-rows: minmax(auto,1fr);
    }

`;
