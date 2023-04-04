import React, { Component } from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import { GalleryWrapper } from "./ImageGallery.styled";
import LoadMoreButton from "components/Button/Button";
import Spiner from "components/Loader/Loader";
import DeafaultScreen from "components/DeafaultScreen/DeafaultScreen";
import ErrorScreen from "components/ErrorScreen/ErrorScreen";
import { toast } from 'react-toastify';
import Modal from "components/Modal/Modal";
import { fetchImages } from "services/api";


export default class ImageGallery extends Component {
    state = {
        gallery: [],
        status: 'idle',
        page: 1,
        showModal: false,
        bigImgUrl: null,
        total: null,
        isLoadBtn: false
    }

    componentDidMount() {
        document.addEventListener('click', ({ target }) => {
            if (target.nodeName !== 'IMG') {
                    this.setState({ showModal: false });
                    return;
                } else {
                    let image = this.state.gallery.filter(obj => {
                        return obj.id === parseInt(target.id);
                    });
                
                this.setState({ bigImgUrl: image[0].largeImageURL});
            }
        });        
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { page } = this.state;
        const prevQuery = prevProps.query;
        const currentQuery = this.props.query;

        // if (currentQuery !== prevQuery) {
        //     this.setState({ gallery: [] });
        // }

        if (currentQuery !== prevQuery || prevState.page !== page) {
            this.setState({ status: 'pending' })
            this.getImages();
        }

        if (currentQuery !== prevQuery) {
            this.showMessage();
        }
    }

    showMessage = () => {
        const { total, query } = this.state;
        console.log(total);

        if(total !== null) {
            return toast.success(`Total images in this gallery: ${total}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
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
    }

    getImages = () => {
        const { page } = this.state;
        const { query } = this.props;

        fetchImages(query, page)
            .then(({ data }) => {
                const total = data.totalHits;
                const newImages = data.hits;

                if (!newImages.length) return;

                this.setState(({ gallery }) => {
                    const newArray = [...gallery, ...newImages];
                    return {
                        gallery: newArray,
                        status: 'resolved',
                        total
                    }
                })

                // return newImages;
            })
            // .then(({ hits }) => {
            // })
            .catch(error => this.setState({
                status: 'rejected',
            })) 
    }

    toggleModal = () => {
        this.setState(({ showModal }) => ({ showModal: !showModal }));
    };


    handleLoadMore = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
        }));

        this.getImages(this.state.page);
    }

    // toggleLoadBtn = () => {
    //     console.log();
    //     if (Math.ceil(this.state.gallery.total / 12) <= page) {
    //         this.setState({ toggleButton: false });
    //     } else {
    //         this.setState({ toggleButton: true });
    //     }
    // }


    render() {
        const { gallery, error, status, page, showModal, bigImgUrl } = this.state;

        if (status === 'idle') {
            return (<DeafaultScreen />);
        }

        if (status === 'pending') {
            return (<Spiner />);
        }

        if (status === 'rejected') {
            return (<ErrorScreen query={this.props.query} />);
        }

        if (status === 'resolved') {
            return (
                <>
                    <GalleryWrapper onClick={this.toggleModal}>
                        {
                            gallery.map(({ id, webformatURL, largeImageURL}) =>
                                <ImageGalleryItem
                                    key={id}
                                    smallUrl={webformatURL}
                                    largeUrl={largeImageURL}
                                />
                            )
                        }
                    </GalleryWrapper>

                    {
                        showModal && <Modal onClose={this.toggleModal} bigImgUrl={bigImgUrl} />
                    }

                    <LoadMoreButton onLoadMore={this.handleLoadMore} />
                </>
            )
        }
    }
}