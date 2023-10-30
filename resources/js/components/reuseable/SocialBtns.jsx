import React, { useContext } from 'react';
import styled from 'styled-components';
import IconToolTipBtn from './IconToolTipBtn';
import PicIconToolTipBtn from './PicIconToolTipBtn';
import MediaComments from '../media/MediaComments';
import TooltipContents from './TooltipContents';
import TooltipBtn from './TooltipBtn';
import { HomeContext } from '../index/HomeContext';
import Response from './Response';
import UserHead from './UserHead';
import ActionUsers from './ActionUsers';
import Heart from './Heart';

const SocialBtns = (props) => {
    const h_context = useContext(HomeContext);
    const {
        media, viewable, commentable, tooltipableComment,
        likeable, shareable, subscribeable, authUser,
        mediaSource, srcStateProps, contentHeight
    } = props;
    return (
        <SocialBtnsStyle>
            { viewable ?
                <div className={ "icon-cont" }>
                    <IconToolTipBtn
                        linkBtn={ false } class={ `view-btn${media.id}` }
                        toolTip={ false } ancestor={ "mainContainer" }
                        textColor={ "" }
                        fontSize={ "large" }
                        display={ "inline-grid" }
                        iconClass={ "far fa-eye" }
                        backgroundColor={ "" }
                        hoverBgColor={ "" }
                        hoverColor={ "" }
                        borderRadius={ "" }
                        border={ "unset" }
                        handleClick={ e => { } }
                        closeable={ true }
                        tooltipMounted={ () => { } }
                        closeTooltip={ () => { } }
                    >
                    </IconToolTipBtn>
                    <sup
                        className={ 'count-badge' }
                        style={ { color: "#888888", padding: "5px", margin: "auto" } }
                    >{ media.views_count != 0 && media.views_count ?
                        <TooltipBtn
                            toolTip={ true }
                            btnText={ media.views_count }
                            textColor={ "#888888" }
                            fontSize={ "inherit" }
                            padding={ 0 }
                            lineHeight={ 1 }
                            backgroundColor={ "transparent" }
                            hoverBgColor={ "" }
                            hoverColor={ "" }
                            borderRadius={ "" }
                            border={ "unset" }
                            loadingText={ "" }
                            tooltipMounted={ () => {
                                mediaSource.getViewedUsers(media.id, media.media_type, srcStateProps);
                            } }
                            ancestor={ "mainContainer" }
                            class={ `viewers-${media.id}` }
                        >
                            <h6>{ `${media.views_count} users viewed this!` }</h6>
                            {/* Viewers names here */ }
                            <TooltipContents
                                maxHeight={ "43vh" }
                                width={ "350px" }
                                height={ contentHeight }
                                overflowY={ "scroll" }
                                fontSize={ "small" }
                            >
                                <Response
                                    responsive={ true }
                                    windowWidth={ h_context.windowWidth }
                                    dataReady={ mediaSource.viewedUsersReady }
                                    datas={ media.views_users }
                                    gettingData={ mediaSource.loadingViewedUsers }
                                    noRecordText={ "Something not right! Try again" }
                                >
                                    {/* shared users here */ }
                                    { media.views_users.length ?
                                        media.views_users.map((action, key) => {
                                            return (
                                                <React.Fragment key={ key }>
                                                    <ActionUsers
                                                        action={ action }
                                                        dpWidth={ "30px" }
                                                        dpHeight={ "30px" }
                                                        lineHeight={ "" }
                                                        key={ key }
                                                    >
                                                        <div className="owner-info"><cite>{ action.user_city }</cite>,{ " " }{ action.user_country } </div>
                                                    </ActionUsers>
                                                </React.Fragment>
                                            );
                                        })

                                        : "" }
                                </Response>
                            </TooltipContents>
                        </TooltipBtn>
                        : "" }</sup>
                </div>
                : "" }
            { commentable ?
                <div className={ "icon-cont" }>
                    <IconToolTipBtn
                        linkBtn={ false } class={ `comment-btn${media.id}` }
                        toolTip={ tooltipableComment } ancestor={ "mainContainer" }
                        textColor={ "" }
                        display={ "inline-grid" }
                        fontSize={ "large" }
                        iconClass={ "far fa-comment-dots" }
                        backgroundColor={ "" }
                        hoverBgColor={ "" }
                        hoverColor={ "" }
                        borderRadius={ "" }
                        border={ "unset" }
                        handleClick={ e => { } }
                        closeable={ false }
                        tooltipMounted={ () => {
                            tooltipableComment ?
                                mediaSource.getMediaComments(media.id, media.media_type, srcStateProps)
                                : "";
                        } }
                        closeTooltip={ false }
                    >
                        <TooltipContents
                            maxHeight={ "85vh" }
                            width={ "350px" }
                            height={ contentHeight }
                            overflowY={ "scroll" }
                            fontSize={ "small" }
                        >
                            {/* make media comments availables first */ }
                            { props.children }
                        </TooltipContents>
                    </IconToolTipBtn>
                    <sup
                        className={ 'count-badge' }
                        style={ { color: "#888888", padding: "5px", margin: "auto" } }
                    >{ media.comments_count != 0 ? media.comments_count : "" }</sup>
                </div>
                : "" }
            { likeable ?
                <div className={ "icon-cont" }>
                    <Heart
                        hasLiked={ media.hasLiked }
                        fontSize={ " large" }
                        title={ "Like photo" }
                        handleClick={ () => { } }
                        handleClick={ e => mediaSource.handleLike(media.id, media.media_type, srcStateProps) }
                        animate={ media.hasLiked }
                    />
                    <sup
                        className={ 'count-badge' }
                        style={ { color: "#888888", padding: "5px", margin: "auto" } }
                    >{ media.likes_count != 0 ?
                        <TooltipBtn
                            toolTip={ true }
                            btnText={ media.likes_count }
                            textColor={ "#888888" }
                            fontSize={ "inherit" }
                            padding={ 0 }
                            lineHeight={ 1 }
                            backgroundColor={ "transparent" }
                            hoverBgColor={ "" }
                            hoverColor={ "" }
                            borderRadius={ "" }
                            border={ "unset" }
                            loadingText={ "" }
                            tooltipMounted={ () => {
                                mediaSource.getLikedUsers(media.id, media.media_type, srcStateProps);
                            } }
                            ancestor={ "mainContainer" }
                            class={ `lovers-${media.id}` }
                        >
                            <h6>{ `${media.likes_count} users liked this!` }</h6>
                            {/* Liked user names here */ }
                            <TooltipContents
                                maxHeight={ "43vh" }
                                width={ "350px" }
                                height={ contentHeight }
                                overflowY={ "scroll" }
                                fontSize={ "small" }
                            >
                                <Response
                                    responsive={ true }
                                    windowWidth={ h_context.windowWidth }
                                    dataReady={ mediaSource.likedUsersReady }
                                    datas={ media.likes_users }
                                    gettingData={ mediaSource.loadingLikedUsers }
                                    noRecordText={ "Something not right! Try again" }
                                >
                                    {/* shared users here */ }
                                    { media.likes_users.length ?
                                        media.likes_users.map((action, key) => {
                                            return (
                                                <ActionUsers
                                                    action={ action }
                                                    dpWidth={ "30px" }
                                                    dpHeight={ "30px" }
                                                    lineHeight={ "" }
                                                    key={ key }
                                                >
                                                    <div className="owner-info"><cite>{ action.user_city }</cite>,{ " " }{ action.user_country } </div>
                                                </ActionUsers>
                                            );
                                        })

                                        : "" }
                                </Response>
                            </TooltipContents>
                        </TooltipBtn>
                        : "" }</sup>
                </div>
                : "" }
            { shareable ?
                <div className={ "icon-cont" }>
                    <PicIconToolTipBtn
                        linkBtn={ false } class={ `share-btn${media.id}` }
                        toolTip={ false } ancestor={ "mainContainer" }
                        padding={ "0 9px" }
                        opacity={ 0.7 }
                        iconClass={ "sirb-share-icon" }
                        backgroundColor={ "" }
                        hoverBgColor={ "" }
                        hoverColor={ "" }
                        borderRadius={ "" }
                        border={ "unset" }
                        handleClick={ e => { } }
                        closeable={ true }
                        tooltipMounted={ () => { } }
                        closeTooltip={ () => { } }
                    >
                    </PicIconToolTipBtn>
                    <sup
                        className={ 'count-badge' }
                        style={ { color: "#888888", padding: "5px", margin: "auto" } }
                    >{ media.shares_count != 0 ?
                        <TooltipBtn
                            toolTip={ true }
                            btnText={ media.shares_count }
                            textColor={ "#888888" }
                            fontSize={ "inherit" }
                            padding={ 0 }
                            lineHeight={ 1 }
                            backgroundColor={ "transparent" }
                            hoverBgColor={ "" }
                            hoverColor={ "" }
                            borderRadius={ "" }
                            border={ "unset" }
                            loadingText={ "" }
                            tooltipMounted={ () => {
                                mediaSource.getSharedUsers(media.id, media.media_type, srcStateProps);
                            } }
                            ancestor={ "mainContainer" }
                            class={ `lovers-${media.id}` }
                        >
                            <h6>{ `${media.shares_count} users shared this!` }</h6>
                            {/* Shared user names here  */ }
                            <TooltipContents
                                maxHeight={ "43vh" }
                                width={ "350px" }
                                height={ contentHeight }
                                overflowY={ "scroll" }
                                fontSize={ "small" }
                            >
                                <Response
                                    responsive={ true }
                                    windowWidth={ h_context.windowWidth }
                                    dataReady={ mediaSource.sharedUsersReady }
                                    datas={ media.shares_users }
                                    gettingData={ mediaSource.loadingSharedUsers }
                                    noRecordText={ "Something not right! Try reload" }
                                >
                                    {/* Liked users here */ }
                                    { media.shares_users.length ?
                                        media.shares_users.map((action, key) => {
                                            return (
                                                <ActionUsers
                                                    action={ action }
                                                    dpWidth={ "30px" }
                                                    dpHeight={ "30px" }
                                                    lineHeight={ "" }
                                                    key={ key }
                                                >
                                                    <div className="owner-info"><cite>{ action.user_city }</cite>,{ " " }{ action.user_country } </div>
                                                </ActionUsers>
                                            );
                                        })

                                        : "" }
                                </Response>
                            </TooltipContents>
                        </TooltipBtn>
                        : "" }</sup>
                </div>
                : "" }
        </SocialBtnsStyle>
    );
};

export default SocialBtns;
export const SocialBtnsStyle = styled.div`
    display: grid;
    grid-auto-flow: column;
    justify-items: center;
    align-items: center;
    align-self: end;
    margin-top: 2px;
    padding-top: 2px;
    border-top: thin solid #e4e4e4;
    sup{
        margin-left: 2px;
    }
`;
