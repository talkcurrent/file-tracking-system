import React from 'react';
import styled from 'styled-components';
import ActionBtn from './ActionBtn';
import Loading from './Loading';

const DisplayPicture = (props) => {
    const { imgTemplate, userObj, imgClick, uploadDp, handleFile, uploading, previewable } = props;

    const userObjLoaded = userObj.hasOwnProperty("id");
    const dpInputFile = React.createRef();

    const images = [];
    imgTemplate.forEach((val, attr) => {
        images[0] = val;
    });
    return (
        <DPStyle >
            { userObjLoaded ?
                imgTemplate.size && previewable == "diplayImg" ?
                    <img
                        src={ images[0] }
                        alt={ `Unknown image` }
                        className="pre"
                    />
                    :
                    <img
                        src={ userObj.profile.dp? `/storage/image/${userObj.profile.dp}`: `/storage/image/imageboy.jpg` }
                        alt={ userObj.first_name }
                        className=""
                        onClick={ e => imgClick(e) }
                    />
                : "" }

            <div className="profile-upload-btn">
                { imgTemplate.size && previewable == "diplayImg" ?
                    <ActionBtn
                        btnText={ "Update" }
                        bgc={ "#296dad" }
                        color={ "whitesmoke" }
                        btnClick={ () => uploadDp() }
                    />
                    :
                    <>
                        <label
                            htmlFor="dp_input_file"
                            style={ { margin: 0 } }
                            className={ `n-btn` }
                            title="Upload your face"
                        >
                            <i className="fas fa-camera"></i>
                        </label>
                        <input
                            type="file" name=""
                            ref={ dpInputFile }
                            id="dp_input_file"
                            style={ { display: "none" } }
                            onChange={ event => {
                                handleFile(event, "diplayImg", 1);
                            } }
                        />
                    </>
                }
            </div>
            {
                uploading ?
                    (<Loading
                        fixed={ false }
                        loaderPos={ `35%` }
                        borderRadius={ `6px / 12px` }
                        transformOrigin={ `3px  16px` }
                        width={ `3px` }
                        height={ `10px` }
                    />)
                    : ("")
            }
        </DPStyle>
    );
};

export default DisplayPicture;
export const DPStyle = styled.div`
    min-height: 14vw;
    max-width: 100%;
    justify-self: center;
    /* position: relative; */
    img {
        width: 18vw;
        height: 18vw;
        max-width: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
    .profile-upload-btn{
        position: absolute;
        bottom: 0;
        right:0;
        display: grid;
        justify-items: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.2);
        .n-btn{
            width: 100%;
            color: #7c7c84;
            background:rgba(255, 255, 255, 0.71);
            padding: 0 3px;
            text-align: center;
            cursor: pointer;
            border-right: 5px solid silver;
            border-left: 4px solid silver;
            border-bottom: 2px solid #e4e4e4;
        }
    }
`;
