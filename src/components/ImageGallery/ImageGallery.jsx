import React from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import { GalleryWrapper } from "./ImageGallery.styled";



const ImageGallery = ({articles}) => (
    <GalleryWrapper class="gallery">
        {
            articles.map(({ id, webformatURL, largeImageURL }) =>
                <ImageGalleryItem
                    id={id}
                    smallUrl={webformatURL}
                    largeUrl={largeImageURL}
                />
            )
        }
    </GalleryWrapper>
)

export default ImageGallery;