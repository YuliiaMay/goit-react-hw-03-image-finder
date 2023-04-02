import React, { Component } from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import { GalleryWrapper } from "./ImageGallery.styled";
import LoadMoreButton from "components/Button/Button";
import Loader from "components/Loader/Loader";
import DeafaultScreen from "components/DeafaultScreen/DeafaultScreen";
import ErrorScreen from "components/ErrorScreen/ErrorScreen";
import { toast } from 'react-toastify';

import { fetchImages } from "services/api";


export default class ImageGallery extends Component {
    state = {
        gallery: [],
        error: null,
        status: 'idle',
        page: 1
    }

    componentDidUpdate = (prevProps, prevState) => {
        const prevQuery = prevProps.query;
        const currentQuery = this.props.query;
        if (currentQuery !== prevQuery) {
            this.setState({ status: 'pending' })
            
            this.getImages(currentQuery, prevState);
    
        }
    }

    getImages = (prevState) => {
        const { page } = this.state;
        const { query } = this.props;

        fetchImages(query, page)
            
            .then(({ data }) => {
                if(data.totalHits > 0) {
                    toast.success(`Total images in this gallery: ${data.totalHits}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });

                    return data;
                }

                toast.error(`No images by query "${query}"`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .then(({hits}) => {
                const gallery = hits;
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

    // handelClick = (e) => {
    //     console.log(e.target);
    // }

    // openModal = (e) => {
    //     console.log(e.target);
    // }


    render() {
        const { gallery, error, status } = this.state;

        if (status === 'idle') {
            return (<DeafaultScreen />);
        }

        if (status === 'pending') {
            console.log('pending');
            return (<Loader />);
        }

        if (status === 'rejected') {
            console.log(`'rejected' : ${this.props.query}`);
            return (<ErrorScreen query={this.props.query} />);
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