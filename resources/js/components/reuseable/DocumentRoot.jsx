import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import useTheme from '../customHooks/useTheme';
import { WelcomeContext } from '../index/WelcomeContext';

const DocumentRoot = (props) => {
    const { windowHeight, navHeight } = useContext(WelcomeContext);
    const [navBarHeight, setnavBarHeight] = useState(0);
    const [bodyHeight, setbodyHeight] = useState(0);
    const [display, setdisplay] = useState(props.display);

    const theme = useTheme();

    useEffect(() => {
        const bHeight = windowHeight - navHeight;
        setnavBarHeight(navHeight);
        setbodyHeight(bHeight);
        if (Number(navHeight) > 10) {
            setdisplay("grid");
        }
        return () => { };
    }, [windowHeight, navHeight]);

    return (
        <DocumentRootStyle
            gtr={ `${navBarHeight}px max-content` }
            display={ display }
            theme={ theme }
            width={ props.width }
            padding={ props.padding }
            overflow={ props.overflow }
            className={ "document-base" }
        >
            {props.bgi && props.bgi != "" ?
                <div className="background">
                    <img
                        src={ `/storage/image/${props.bgi}` }
                        alt={ "" }
                        className=""
                    />
                </div>
                : "" }
            { props.children }
        </DocumentRootStyle>
    );
};

export default DocumentRoot;
export const DocumentRootStyle = styled.div`
    display: ${props => props.display};
    padding: ${props => props.padding};
    width: ${props => props.width};
    background-color: ${props => props.theme.nav_bgc};
    grid-template-rows: ${props => props.gtr};
    min-height: 100vh;
    margin: 0 auto;
    /* max-height: 100vh; */
    overflow: ${props => props.overflow};
    position: relative;
    .background{
        grid-column: 1;
        grid-row: 1;
        height: 100vh;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            
        }
    }
`;
