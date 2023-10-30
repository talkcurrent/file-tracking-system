import React from 'react';
import styled from 'styled-components';

const NoRecord = (props) => {
    return (
        <EmptyRecord>
            { props.children }
        </EmptyRecord>
    );
};

export default NoRecord;
export const EmptyRecord = styled.div`
    position: relative;
    padding: 30px 0;
    background: transparent;
    text-align: center;
`;