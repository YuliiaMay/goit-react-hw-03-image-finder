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

    componentDidUpdate = (prevProps, prevState) => {
        const { page, total } = this.state;
        const prevQuery = prevProps.query;
        const currentQuery = this.props.query;

        if (currentQuery !== prevQuery) {
            this.setState({ gallery: [] });
        }


        if (currentQuery !== prevQuery || prevState.page !== page) {
            this.setState({ status: 'pending' })
            this.getImages();
        }

        if (page === 1) {
            this.showSuccesMessage(total);
            return;
        }

        console.log(prevState.gallery === []);
        // if (prevState.gallery === null) {
        //     this.showSuccesMessage(total);
        //     return;
        // }

        // if (total !== null) {
        //     this.showSuccesMessage(total);
        //     return;
        // }
    }

    showSuccesMessage = () => {
        const { total } = this.state;
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
    }

    showErrorMessage = (query) => {
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

                if (!newImages.length) {
                    this.showErrorMessage(query);
                    this.setState({status: 'rejected'})
                    return;
                }

                this.setState(({ gallery }) => {
                    const newArray = [...gallery, ...newImages];
                    return {
                        gallery: newArray,
                        status: 'resolved',
                        total
                    }
                })
            })

            .catch(error => this.setState({
                status: 'rejected',
            })) 
    }

    toggleModal = ({ target }) => {
        this.setState(({ showModal }) => ({ showModal: !showModal }));
    };

    openModal = ({target}) => {
        this.setState({bigImgUrl: target.dataset.url})
    }


    handleLoadMore = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
        }));
    }

    render() {
        const { gallery, status, showModal, bigImgUrl, total } = this.state;


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
                                    onOpenModal={this.openModal}
                                />
                            )
                        }
                    </GalleryWrapper>

                    {
                        showModal && <Modal onClose={this.toggleModal}  bigImgUrl={bigImgUrl} query={this.props.query} />
                    }


                    {
                        gallery.length > 0 && gallery.length !== total && (
                            <LoadMoreButton onLoadMore={this.handleLoadMore} query={this.props.query} />
                        )
                    }
                    
                </>
            )
        }
    }
}