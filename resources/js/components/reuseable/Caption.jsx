import React, { useContext } from 'react';
import styled from 'styled-components';
import { HomeContext } from '../index/HomeContext';
import WordCount from './WordCount';
import Truncate from './Truncate';
import { Link } from 'react-router-dom';

const Caption = (props) => {
    const h_context = useContext(HomeContext);
    const { theme, windowWidth } = h_context;
    const { objLink, dataObj, fontSize, lineHeight, truncateLimit } = props;

    return (
        <CaptionStyle
            bgc={ theme.cardsBgc }
            color={ theme.color }
            fontSize={ fontSize }
            lineHeight={ lineHeight }
        >
            { objLink ?
                <Link
                    to={ {
                        pathname: objLink,
                        myProps: {
                            prevURL: location.pathname,
                            videoObj: dataObj,
                        }
                    } }
                >
                    { WordCount(dataObj.caption) > truncateLimit ?
                        <span className={ "caption" }>{ Truncate(dataObj.caption, truncateLimit) }</span>
                        :
                        <span className={ "caption" }>{ dataObj.caption }</span>
                    }
                </Link>
                :
                <React.Fragment>
                    { WordCount(dataObj.caption) > truncateLimit ?
                        <span className={ "caption" }>{ Truncate(dataObj.caption, truncateLimit) }</span>
                        :
                        <span className={ "caption" }>{ dataObj.caption }</span>
                    }
                </React.Fragment>
            }
            {/* social buttons can go in here */ }
            { props.children }
        </CaptionStyle>
    );
};

export default Caption;
export const CaptionStyle = styled.div`
    display: grid;
    color: ${props => props.color};
    background: ${props => props.bgc};
    font-size: ${props => props.fontSize};
    line-height: ${props => props.lineHeight};
    border-radius: 0 0 5px 5px;
    .caption{
        padding: 0 2px 0 2px
    }
`;
