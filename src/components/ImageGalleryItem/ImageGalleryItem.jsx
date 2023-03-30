import React from "react";

const ImageGalleryItem = ({id, smallUrl, largeUrl}) => (
    <li key={id} class="gallery-item">
        <img src={smallUrl} alt="" />
    </li>
)

export default ImageGalleryItem;