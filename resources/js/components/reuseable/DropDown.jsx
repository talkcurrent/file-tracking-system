import React from 'react';
import styled from 'styled-components';

const DropDrown = (props) => {
    const { listOne, listTwo, listThree, listFour,
        listFive, listSix, listSeven, listEight, listNine
        , listTen, listEleven, listTwelve, listThirteen,
        listFourteen, listFifteen, listSixteen } = props;
    return (
        <DropDownMenu>
            <div className="dropdown-list">
                { listOne ? <div onClick={ props.listOne.func }>{ listOne.text }</div> : "" }
                { listTwo ? <div onClick={ props.listTwo.func }>{ listTwo.text }</div> : "" }
                { listThree ? <div onClick={ props.listThree.func }>{ listThree.text }</div> : "" }
                { listFour ? <div onClick={ props.listFour.func }>{ listFour.text }</div> : "" }
                { listFive ? <div onClick={ props.listFive.func }>{ listFive.text }</div> : "" }
                { listSix ? <div onClick={ props.listSix.func }>{ listSix.text }</div> : "" }
                { listSeven ? <div onClick={ props.listSeven.func }>{ listSeven.text }</div> : "" }
                { listEight ? <div onClick={ props.listEight.func }>{ listEight.text }</div> : "" }
                { listNine ? <div onClick={ props.listNine.func }>{ listNine.text }</div> : "" }
                { listTen ? <div onClick={ props.listTen.func }>{ listTen.text }</div> : "" }
                { listEleven ? <div onClick={ props.listEleven.func }>{ listEleven.text }</div> : "" }
                { listTwelve ? <div onClick={ props.listTwelve.func }>{ listTwelve.text }</div> : "" }
                { listThirteen ? <div onClick={ props.listThirteen.func }>{ listThirteen.text }</div> : "" }
                { listFourteen ? <div onClick={ props.listFourteen.func }>{ listFourteen.text }</div> : "" }
                { listFifteen ? <div onClick={ props.listFifteen.func }>{ listFifteen.text }</div> : "" }
                { listSixteen ? <div onClick={ props.listSixteen.func }>{ listSixteen.text }</div> : "" }
            </div>
        </DropDownMenu>
    );
};

export default DropDrown;
export const DropDownMenu = styled.div`
    position: absolute;
    width: max-content;
    border: 1px solid rgb(226, 222, 222);
    border-radius: 5px;
    z-index: 3;
    overflow: hidden;
    background: #dee2e6;
    right: 0px;
    animation: toggle .2s cubic-bezier(0.895, 0.030, 0.685, 0.220) forwards;
    .dropdown-list{
        display: grid;
        grid-gap: 1px;
        div{
            padding: 0px 5px;
            background: #f8f9fa;
            font-size: medium;
            cursor: pointer;
            &:hover{
                color: #f8f9fa;
                background: #3b783a;

            }
        }
    }
    @keyframes toggle {
        from {
            opacity: 0;
            transform: scale(0.3);
        }
        to {
            opacity: 1;
            transform: scale(1)
        }
    }

`;