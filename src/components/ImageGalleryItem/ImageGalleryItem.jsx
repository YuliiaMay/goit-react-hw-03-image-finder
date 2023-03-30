import React from "react";
import { ImageItem, Image } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({id, smallUrl, largeUrl}) => (
    <ImageItem key={id} class="gallery-item">
        <Image src={smallUrl} alt="" />
    </ImageItem>
)

export default ImageGalleryItem;