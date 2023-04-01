import React, { Component } from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import { GalleryWrapper } from "./ImageGallery.styled";
import LoadMoreButton from "components/Button/Button";
import Loader from "components/Loader/Loader";



export default class ImageGallery extends Component {
    state = {
        gallery: [],
        error: null,
        status: 'idle'
    }

    componentDidUpdate = (prevProps, prevState) => {
        const prevQuery = prevProps.query;
        const currentQuery = this.props.query;
        if (currentQuery !== prevQuery) {
            this.setState({status: 'pending'})

            fetch(`https://pixabay.com/api/?key=33500508-b4271a177ba3ac813eaf35292&q=${currentQuery}&image_type=photo&orientation=horizontal&page=1&per_page=12`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }

                    return Promise.reject(new Error(`we have not found images for search query ${currentQuery}`))
                })
                .then( data  => {
                    const gallery = data.hits;
                    console.log(gallery);
                    return this.setState({
                        gallery,
                        ...prevState.gallery,
                        status: 'resolved',
                    })
                })
                .catch(error => this.setState({
                    error,
                    status: 'rejected',
                }))       
        }
    }

    handelClick = (e) => {
        console.log(e.target);
    }

    openModal = (e) => {
        console.log(e.target);
    }
    


    render() {
        const { gallery, isLoading, error, status } = this.state;

        

        if (status === 'idle') {
            return <h1>enter your query</h1>
        }

        if (status === 'pending') {
            return <Loader />
        }

        if (status === 'rejected') {
            return <h1>{error.message}</h1>
        }

        if (status === 'resolved') {
            return (
                <>
                    <GalleryWrapper>
                        {
                            gallery.map(({ id, webformatURL, largeImageURL }) =>
                                <ImageGalleryItem
                                    openModal={this.openModal}
                                    key={id}
                                    smallUrl={webformatURL}
                                    largeUrl={largeImageURL}
                                />
                            )
                        }
                    </GalleryWrapper>

                    <LoadMoreButton />
                </>            
            )
        }
    }
}