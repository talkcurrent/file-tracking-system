import React from 'react';
import styled from 'styled-components';

const Tdata = (props) => {
    const { bgc, align, color, bRadius } = props;
    return (
        <TdataStyled
            bgc={ bgc }
            align={ align }
            color={ color }
            bRadius={ bRadius }
        >
            { props.children }
        </TdataStyled>
    );
};

export default Tdata;
export const TdataStyled = styled.div`
    display: grid;
    align-items: center;
    color: ${props => props.color};
    background: ${props => props.bgc};
    width: 100%;
    height: 100%;
    border-radius: ${props => props.bRadius};
    text-align: ${props => props.align};

`;
