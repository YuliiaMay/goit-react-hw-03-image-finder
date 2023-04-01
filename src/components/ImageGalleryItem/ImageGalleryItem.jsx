import React from "react";
import { ImageItem, Image } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({smallUrl, largeUrl, openModal}) => (
    <ImageItem onClick={openModal}>
        <Image src={smallUrl} alt="" />
    </ImageItem>
)

export default ImageGalleryItem;