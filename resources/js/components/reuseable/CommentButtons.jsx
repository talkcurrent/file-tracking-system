import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CommentButtons = (props) => {
    const [totalComments, setTotalComments] = useState(0);
    const [likesCount, setLikesCount] = useState(0);
    const [sharesCount, setSharesCount] = useState(0);

    useEffect(() => {
        setTotalComments(props.totalComments);
        setLikesCount(props.likesCount);
        setSharesCount(props.sharesCount);
    });
    return (
        <CommentsBtn>
            <div className="post-reply-btn">
                <a
                    style={ { color: "green" } }
                    title="Post comment"
                    className=""
                // onClick={ e => {
                //     this.toggleCommentCotainer(e);
                // } }
                ></a>
                <span className="img-com-count">{ totalComments != 0 ? totalComments : "" }</span>
            </div>
            <div className="post-lyk-btn">
                <i
                    title="Like or unlike"
                    className={ `${props.hasLiked ? "fas green" : "far"} fa-heart fa-lg` }
                // onClick={ this.handleLike }
                ></i>
                <span className="post-lyk-count">
                    { likesCount != 0 ? likesCount : "" }
                </span>
            </div>
            <div className="post-share-btn">
                <a className="btn btn-default btn-sm p-s-b"></a>
                <span>{ sharesCount != 0 ? sharesCount : "" }</span>
            </div>
        </CommentsBtn>
    );
};

export default CommentButtons;

export const CommentsBtn = styled.div`
    /* padding: 2px 0px 2px 0px; */
    border-top: 1px solid rgb(226, 222, 222);
    display: grid;
    width: 100%;
    justify-self: center;
    grid-template-columns: 1fr 1fr 1fr;

    .post-reply-btn {
        display: grid;
        grid-template-columns: 1fr 1fr;

        a {
            background-image: url("/storage/image/reply_black.png");
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
            padding: 9px;
            opacity: 0.5;
            align-self: center;
            justify-self: center;
        }

        span {
            color: rgb(136, 161, 136);
            cursor: pointer;
        }
    }

    .post-lyk-btn {
        display: grid;
        grid-template-columns: 1fr 1fr;

        i {
            justify-self: center;
            align-self: center;
            font-size: 120%;
            color: black;
            opacity: 0.5;
            cursor: pointer;
            &.green {
                color: #0d7739;
                opacity: 0.7;
            }
        }

        span {
            color: rgb(136, 161, 136);
            cursor: pointer;
        }
    }

    .post-share-btn {
        display: grid;
        grid-template-columns: 1fr 1fr;

        .p-s-b {
            background-image: url("/storage/image/share_black.png");
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
            padding: 9px;
            opacity: 0.5;
            align-self: center;
            justify-self: center;
        }

        span {
            color: rgb(136, 161, 136);
            cursor: pointer;
        }
    }
`;