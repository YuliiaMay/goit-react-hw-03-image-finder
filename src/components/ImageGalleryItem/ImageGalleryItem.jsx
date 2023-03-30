import React from "react";
import { ImageItem, Image } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({id, smallUrl, largeUrl}) => (
    <ImageItem >
        <Image src={smallUrl} alt="" />
    </ImageItem>
)

export default ImageGalleryItem;