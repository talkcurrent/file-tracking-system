import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import IconToolTipBtn from './IconToolTipBtn';
import ActionBtn from './ActionBtn';
import FormInput from './FormInput';
import FormSelInput from './FormSelInput';
import TooltipContents from './TooltipContents';
import EditableDiv from './EditableDiv';
import WordCount from './WordCount';

const MenuBtn = (props) => {
    const [menu, setMenu] = useState(false);
    const [flagReason, setflagReason] = useState({ text: "", error: true });
    const [reasonOption, setreasonOption] = useState("");
    const { authUser, windowWidth,
        ancestor, data, padding,
        editable, flaggable, saveable, downloadable,
        borderR, color, bgc, top, bottom } = props;
    const owner = authUser.id == data.user_id;
    const flagsCount = data.flags_count;

    useEffect(() => {
        if (document.querySelector(`.${ancestor}`)) {
            document.querySelector(`.${ancestor}`)
                .addEventListener("click", handleMenuClose, true);
        }
        return () => {
            document.querySelector(`.${ancestor}`)
                .removeEventListener("click", handleMenuClose, true);
        };
    }, []);

    const handleMenu = (event) => {
        setMenu(!menu);
    };
    const handleMenuClose = (e) => {
        if (!e.target.closest(`.${props.class}`)) {
            setMenu(false);
        }
    };
    const handleOnInput = (event, name) => {
        const target = event.target;
        const value = target.textContent.trim().replace(/\s\s+/g, " ");
        const trimValue = target.textContent.trim();
        if (trimValue.length > 0 && WordCount(trimValue) <= 30) {
            setflagReason({ text: value, error: false });
        } else {
            setflagReason({ text: value, error: true });
        }
    };
    var { ...menuProps } = props;
    return (
        <MenuBtnStyle
            padding={ padding }
            borderR={ borderR }
            color={ color }
            bgc={ bgc }
            top={ top }
            bottom={ bottom }
            windowWidth={ windowWidth }
            zIndex={ menu ? 2 : "" }
        >
            <div className={ `menu-inner ${props.class}` }>
                <IconToolTipBtn
                    linkBtn={ false } pointer={ false }
                    class={ `tooltip-ellipsis-btn${data.id}` }
                    toolTip={ true } ancestor={ "mainContainer" }
                    textColor={ "gray" }
                    fontSize={ "small" }
                    iconClass={ menuProps.menuType ? menuProps.menuType : "fas fa-ellipsis-h" }
                    handleClick={ () => { } }
                    tooltipMounted={ () => { } }
                    border={ "unset" }
                    overflowY={ false }
                    closeTooltip={ menuProps.closeTooltip }
                >
                    <TooltipContents
                        padding={ "10px 2px 0px 2px" }
                        alignItems={ "center" }
                        justifyItems={ "center" }
                    >
                        { flaggable ?
                            <div className={ "menu-flag-flag-count" }>
                                <IconToolTipBtn
                                    linkBtn={ false } class={ `tooltip-flag-btn${data.id}` }
                                    toolTip={ data.flagged ? false : true } ancestor={ "mainContainer" }
                                    textColor={ "deeppink" }
                                    fontSize={ "small" }
                                    iconClass={ data.flagged ? "fa fa-flag" : "far fa-flag" }
                                    backgroundColor={ "" }
                                    hoverBgColor={ "" }
                                    hoverColor={ "" }
                                    borderRadius={ "" }
                                    border={ "unset" }
                                    btnText={ '' }
                                    handleClick={ e => menuProps.handleFlag(reasonOption, flagReason.text, data.id, data.user_id) }
                                    closeable={ true }
                                    tooltipMounted={ () => { } }
                                    closeTooltip={ menuProps.closeTooltip }
                                >
                                    <TooltipContents
                                        padding={ "10px 2px 0px 2px" }
                                    >
                                        <div className="input-grid" style={ { display: "grid", gridGap: "10px" } }>
                                            <FormSelInput
                                                handleChange={ e => {
                                                    setreasonOption(e.target.value);
                                                } }
                                                justifySelf={ "" }
                                                width={ "100%" }
                                                error={ reasonOption == "" }
                                                label={ "" }
                                                value={ reasonOption }
                                                disabled={ false }
                                                uniqId={ "reasonOption" }
                                                selectText={ "Select your reason" }
                                            >
                                                <option value="hate_speech">Hate Speech</option>
                                                <option value="racism">Promote racism</option>
                                                <option value="pornography">Pornography</option>
                                                <option value="scam">Scam</option>
                                                <option value="misleading">Misleading</option>
                                            </FormSelInput>
                                            <EditableDiv
                                                errorable={ true }
                                                placeholder={ 'Make us know more...' }
                                                width={ '100%' }
                                                miniHeight={ 'auto' }
                                                padding={ '5px 10px' } color={ "#495057" } bgc={ "rgb(254 254 254)" }
                                                borderRadius={ '30px' }
                                                searchBar={ false } wordLimit={ true }
                                                string={ flagReason.text } limit={ 30 }
                                                handleOninput={ handleOnInput }
                                            ></EditableDiv>
                                        </div>

                                        <ActionBtn
                                            disabled={ menuProps.flagging || flagReason.text == "" || reasonOption == "" }
                                            processing={ menuProps.flagging }//bool
                                            progressText={ "Flagging" }
                                            btnText={ "Flag" } width={ "100%" }
                                            justify={ "center" }
                                            bgc={ "deeppink" }
                                            color={ "whitesmoke" }
                                            btnClick={ e => menuProps.handleFlag(reasonOption, flagReason.text, data.id, data.user_id) }
                                        />
                                    </TooltipContents>
                                </IconToolTipBtn>
                                <small style={ { color: "#888888", fontSize: "small" } }>{ flagsCount != 0 ? flagsCount : "0" }</small>
                            </div>
                            : "" }
                        { owner ? (
                            <React.Fragment>
                                { editable ?
                                    <IconToolTipBtn
                                        linkBtn={ false } class={ `tooltip-edit-btn${data.id}` }
                                        toolTip={ false } ancestor={ "mainContainer" }
                                        textColor={ "gray" }
                                        fontSize={ "small" }
                                        iconClass={ "fas fa-pen" }
                                        handleClick={ e => menuProps.handleEdit(data.id) }
                                        border={ "unset" }
                                        tooltipMounted={ () => { } }
                                    >
                                    </IconToolTipBtn>
                                    : "" }
                                <IconToolTipBtn
                                    linkBtn={ false } class={ `tooltip-delete-btn${data.id}` }
                                    toolTip={ true } ancestor={ "mainContainer" }
                                    textColor={ "deeppink" }
                                    fontSize={ "small" }
                                    iconClass={ "far fa-trash-alt" }
                                    handleClick={ () => { } }
                                    tooltipMounted={ () => { } }
                                    border={ "unset" }
                                    closeTooltip={ menuProps.closeTooltip }
                                >
                                    <TooltipContents
                                        padding={ "0 5px" }
                                    >
                                        <span>Proceed delete?</span>
                                        <ActionBtn
                                            disabled={ menuProps.deleting }
                                            processing={ menuProps.deleting }//bool
                                            progressText={ "Deleting" }
                                            btnText={ "Delete" } width={ "100%" }
                                            justify={ "center" }
                                            bgc={ "deeppink" }
                                            color={ "whitesmoke" }
                                            btnClick={ e => props.handleDeleteSingle(data.id) }
                                        />
                                    </TooltipContents>
                                </IconToolTipBtn>
                                { props.children }
                            </React.Fragment>
                        ) : (
                            ""
                        ) }
                        { saveable ?
                            < IconToolTipBtn
                                linkBtn={ false } class={ `tooltip-save-btn${data.id}` }
                                toolTip={ true } ancestor={ "mainContainer" }
                                textColor={ "gray" }
                                fontSize={ "small" }
                                iconClass={ "fas fa-save" }
                                handleClick={ () => { } }
                                tooltipMounted={ () => { } }
                                border={ "unset" }
                            >
                                <TooltipContents
                                    padding={ "0 5px" }
                                >
                                    <span>{ data.hasBookmarked ?
                                        "Item already in bookmarks"
                                        : "Save item to bookmarks" }</span>
                                    <ActionBtn
                                        disabled={ menuProps.savingItems }
                                        processing={ menuProps.savingItems }//bool
                                        progressText={ data.hasBookmarked ? "Unsaving" : "Saving" }
                                        btnText={ data.hasBookmarked ? "Remove" : "Save" } width={ "100%" }
                                        justify={ "center" }
                                        bgc={ "gray" }
                                        color={ "whitesmoke" }
                                        btnClick={ e => menuProps.handleSave(data.id) }
                                    />
                                </TooltipContents>
                            </IconToolTipBtn>
                            : "" }
                        { downloadable ?
                            <IconToolTipBtn
                                linkBtn={ false } class={ `tooltip-download-btn${data.id}` }
                                toolTip={ true } ancestor={ "mainContainer" }
                                textColor={ "gray" }
                                fontSize={ "small" }
                                iconClass={ "fas fa-download" }
                                handleClick={ () => { } }
                                tooltipMounted={ () => { } }
                                border={ "unset" }
                            >
                                <TooltipContents
                                    padding={ "0 5px" }
                                >
                                    <ActionBtn
                                        disabled={ menuProps.preparingSmDownload }
                                        processing={ menuProps.preparingSmDownload }//bool
                                        progressText={ "Preparing" }
                                        btnText={ "Small size" } width={ "100%" }
                                        justify={ "center" }
                                        bgc={ "" }
                                        color={ "gray" }
                                        btnClick={ e => menuProps.handleDownload(data.id, "smallSize") }
                                    />
                                    <ActionBtn
                                        disabled={ menuProps.preparingFullDownload }
                                        processing={ menuProps.preparingFullDownload }
                                        progressText={ "Preparing" }
                                        btnText={ "Full size" } width={ "100%" }
                                        justify={ "center" }
                                        bgc={ "" }
                                        color={ "gray" }
                                        btnClick={ e => menuProps.handleDownload(data.id, "fullSize") }
                                    />
                                </TooltipContents>
                            </IconToolTipBtn>
                            : "" }
                    </TooltipContents>
                </IconToolTipBtn>
            </div>
        </MenuBtnStyle >
    );
};

export default MenuBtn;
export const MenuBtnStyle = styled.div`
    position: absolute;
    top: ${props => props.bottom ? "" : "3px"};
    bottom: ${props => props.top ? "" : props.bottom};
    right: 3px;
    line-height: 0.4;
    color: ${props => props.color};
    background: ${props => props.bgc};
    border-radius: ${props => props.borderR};
    padding: ${props => props.padding};
    cursor: pointer;
    font-size: large;
    /* opacity: 0.7; */
    z-index: ${props => props.zIndex};
    transition: all ease-in-out 0.3s;
    &:hover{
        opacity: 1;
    }
    .menu-inner{
        position: relative;
        .menu-flag-flag-count{
            display: grid;
            grid-auto-flow: column;
            grid-template-columns: max-content;
            grid-gap: 3px;
        }
        .menu-flag{
            display: grid;
            grid-auto-flow: column;
            align-items: center;
            grid-gap: 2px;
        }
    }
`;
