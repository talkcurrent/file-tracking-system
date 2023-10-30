import React, { Component } from "react";
import styled from "styled-components";

export class ImagePreview extends Component {
    componentDidMount() {
        if (this.props.comMounted) {
            this.props.comMounted();
        }
    }
    render() {
        const { min, max, imgTemplate, fileObj, fileObjName, handleDelPreview } = this.props;

        const images = [];
        imgTemplate.forEach((val, attr) => {
            images.push({ attr: attr, val: val });
        });
        return (
            <ImgPreview min={ min } max={ max }>
                { images.map(preview => {
                    return (
                        <div className="prod-img-prev-cont" key={ preview.attr }>
                            <img
                                src={ preview.val }
                                alt="An image"
                                style={ {
                                    borderRadius: "7px",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                } }
                            />
                            <div
                                className="productDelPrev"
                                onClick={ e => handleDelPreview(preview.attr, fileObj, fileObjName) }
                            >
                                <div className="del-icon">+</div>
                            </div>
                        </div>
                    );
                }) }
            </ImgPreview>
        );
    }
}
export const ImgPreview = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(${props => props.min}, ${props => props.max}));
    grid-auto-rows: 1fr;
    gap: 5px;
    padding: 4px 0px 0px 0px;
    opacity: 1;
    transition: all ease-in 2s;

    .prod-img-prev-cont {
        position: relative;

        .productDelPrev {
            position: absolute;
            top: 4px;
            left: 4px;
            display: grid;
            width: 20px;
            height: 20px;
            align-items: center;
            justify-items: center;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.3);
            cursor: pointer;
            .del-icon {
                color: white;
                text-align: center;
                line-height: normal;
                transform: rotate(45deg);
                font-weight: bolder;
            }
        }
    }
`;
