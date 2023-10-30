import React from 'react';
import styled from 'styled-components';

function Location(props) {
    return (
        <LocationStyle
            display={ props.display }
        >
            <React.Fragment><span className={ "city" }>{ props.city }</span>{ ", " }
                <span className={ "country" }>{ props.country }</span></React.Fragment>
        </LocationStyle>
    );
}

export default Location;
const LocationStyle = styled.div`
    display: ${props => props.display};
    color: #828282;
    font-family: serif;
    padding: 0 0 0 2px;
    .city{
        font-style: italic;
    }
    .country{
        font-weight: bolder;
        font-size: smaller;
    }
`;
