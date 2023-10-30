import React from 'react';
import styled from 'styled-components';
import TooltipBtn from '../../reuseable/TooltipBtn';

const PrevNextBtns = (props) => {
    const { nextUrl, prevUrl } = props;
    return (
        <PrevNextBtnsStyle>
            <div className="prev">
                { prevUrl ?
                    <TooltipBtn
                        linkBtn={ true }
                        btnLink={ prevUrl }
                        class={ `next-btn` }
                        toolTip={ false } ancestor={ "emp-view-main" }
                        textColor={ "#4cade4" } fontSize={ "small" }
                        closeTooltip={ "" }
                        backgroundColor={ "transparent" }
                        hoverBgColor={ "#4cade4" }
                        hoverColor={ "whitesmoke" }
                        borderRadius={ "5px" }
                        border={ "" }
                        btnText={ "<< Prev" }
                        handleClick={ "" }
                    />

                    : ""
                }
            </div>
            <div className="next">
                { nextUrl ?
                    <TooltipBtn
                        linkBtn={ true }
                        btnLink={ nextUrl }
                        class={ `next-btn` }
                        toolTip={ false } ancestor={ "emp-view-main" }
                        textColor={ "#4cade4" } fontSize={ "small" }
                        closeTooltip={ "" }
                        backgroundColor={ "transparent" }
                        hoverBgColor={ "#4cade4" }
                        hoverColor={ "whitesmoke" }
                        borderRadius={ "5px" }
                        border={ "" }
                        btnText={ "Next >>" }
                        handleClick={ "" }
                    />
                    : ""
                }
            </div>
        </PrevNextBtnsStyle>
    );
};

export default PrevNextBtns;
export const PrevNextBtnsStyle = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    .prev{
        justify-self: start;
    }
    .next{
        justify-self: end;
    }
`;
