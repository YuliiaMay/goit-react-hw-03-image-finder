import React, { Component } from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import { GalleryWrapper } from "./ImageGallery.styled";


export default class ImageGallery extends Component {
    state = {
        gallery: [],
    }

    componentDidUpdate = (prevProps, prevState) => {
        const prevQuery = prevProps.query;
        const currentQuery = this.props.query;
        if (currentQuery !== prevQuery) {
            // this.setState({currentQuery})
            fetch(`https://pixabay.com/api/?key=33500508-b4271a177ba3ac813eaf35292&q=${currentQuery}&image_type=photo&orientation=horizontal&page=1&per_page=12`)
                .then(res => res.json())
                .then( data  => {
                    const gallery = data.hits;
                    this.setState({gallery, ...prevState.gallery})
                });            
        }
    }
    


    render() {
        const { gallery } = this.state;

        return (
            <GalleryWrapper>
                {
                    gallery.map(({ id, webformatURL, largeImageURL }) =>
                        <ImageGalleryItem
                            key={id}
                            smallUrl={webformatURL}
                            largeUrl={largeImageURL}
                        />
                    )
                }
            </GalleryWrapper>
        )
    }
}