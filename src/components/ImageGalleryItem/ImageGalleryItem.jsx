import React from "react";
import { ImageItem, Image } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({smallUrl, query, largeUrl, onOpenModal}) => (
    <ImageItem onClick={onOpenModal}>
        <Image src={smallUrl} alt={query} data-url={largeUrl} />
    </ImageItem>
)

export default ImageGalleryItem;