import React from 'react';
import styled from 'styled-components';

const HorizontalMenu = (props) => {
    const { align, justify, gap } = props;
    return (
        <MenuStyle
            align={ align }
            justify={ justify }
            gap={ gap }
        >
            {props.children }
        </MenuStyle>
    );
};

export default HorizontalMenu;

const MenuStyle = styled.div`
    display: grid;
    grid-auto-flow: column;
    gap:${props => props.gap};
    justify-items:${props => props.justify};
    align-items:${props => props.align};
`;