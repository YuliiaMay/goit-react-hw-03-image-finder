import React from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import { GalleryWrapper } from "./ImageGallery.styled";



const ImageGallery = ({articles}) => (
    <GalleryWrapper>
        {
            articles.map(({ id, webformatURL, largeImageURL }) =>
                <ImageGalleryItem
                    key={id}
                    smallUrl={webformatURL}
                    largeUrl={largeImageURL}
                />
            )
        }
    </GalleryWrapper>
)

export default ImageGallery;