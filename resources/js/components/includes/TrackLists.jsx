import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import HorizontalUserCard from '../reuseable/HorizontalUserCard';
import SQLDateToJSDate from '../reuseable/SQLDateToJSDate';

const TrackLists = (props) => {
    const { receiver, forwarder } = props.express;

    useEffect(() => {

        return () => { };
    }, []);

    return (
        <ListStyle>
            <HorizontalUserCard
                cardBgc={ "whitesmoke" }
                cardElemBgc={ "whitesmoke" }
                gtc={ "40px auto" }
                cardImgUrl={ `/storage/image/${receiver.profile.dp}` }
                fSize={ "" }
                handleClick={ () => { } }
                lHeight={ 1 }
                margin={ "0 10px" }
                bShadow={ "0px 0px 2px #296DBB" }
            >
                <h5 style={ { color: "#296dad", margin: 0 } }>{ receiver.first_name }{ ' ' }{ receiver.last_name }{ ' ' }{ receiver.other_name }</h5>
                <div>Received on:<strong>{ ` ${SQLDateToJSDate(props.express.created_at, true)}` }</strong></div>
            </HorizontalUserCard>
        </ListStyle>
    );
};

export default TrackLists;

const ListStyle = styled.div`
    display: grid;
    grid-template-rows: max-content;
    gap: 2px;
`;