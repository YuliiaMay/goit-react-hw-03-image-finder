import React, { Component } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
// import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";





export class App extends Component {
  state = {
    query: '',
    gallery: {},
    isLoading: false,
    error: null,
  }


  handelSubmit = (query) => {
    this.setState({query})
  }
  // "?q=love&page=1&key=33500508-b4271a177ba3ac813eaf35292&q&image_type=photo&orientation=horizontal&per_page=12"
  // async componentDidMount() {
  //   this.setState({ isLoading: true });

  //   try {
  //     const response = await axios.get('?key=33500508-b4271a177ba3ac813eaf35292&q=sport&image_type=photo&page=1&per_page=12');
  //     this.setState({
  //       gallery: response.data.hits,
  //     });
  //   } catch (error) {
  //     this.setState({ error });
  //   } finally {
  //     this.setState({ isLoading: false });      
  //   }

  // }


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

          {error && <p>Whoops, something went wrong: {error.message}</p>}
          {isLoading && <Loader />}
          {/* {gallery.length > 0 && <ImageGallery gallery={gallery} />} */}


          <ImageGallery gallery={gallery}  query={this.state.query} />

          <ToastContainer />

          {/* <Modal /> */}

        </div>
      );
  }
};
