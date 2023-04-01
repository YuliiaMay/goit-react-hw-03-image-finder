import React, { Component } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
// import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";
import LoadMoreButton from "./Button/Button";




export class App extends Component {
  state = {
    query: '',
    gallery: {},
  }


  handelSubmit = (query) => {
    this.setState({query})
  }


  render() {
    const { gallery, isLoading, error } = this.state;
      return (
        <div
          style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gridGap: '16px',
              paddingBottom: '24px',
          }}
        >
          
          <Searchbar onSubmit={this.handelSubmit} />


          
          
          <ImageGallery gallery={gallery}  query={this.state.query} />

          <ToastContainer />

          

          {/* <Modal /> */}

        </div>
      );
  }
};
