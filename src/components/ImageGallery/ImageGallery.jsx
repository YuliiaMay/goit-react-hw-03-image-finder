import React from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";



const ImageGallery = ({articles}) => (
    <ul class="gallery">
        {
            articles.map(({ id, webformatURL, largeImageURL }) =>
                <ImageGalleryItem
                    id={id}
                    smallUrl={webformatURL}
                    largeUrl={largeImageURL}
                />
            )
        }
    </ul>
)

export default ImageGallery;