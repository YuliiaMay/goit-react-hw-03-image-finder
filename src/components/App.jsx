import React, { Component } from "react";
import axios from "axios";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
// import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";


axios.defaults.baseURL = "https://pixabay.com/api/";



export class App extends Component {
  state = {
    articles: [],
  }

  // "?q=love&page=1&key=33500508-b4271a177ba3ac813eaf35292&q&image_type=photo&orientation=horizontal&per_page=12"
  async componentDidMount() {
    const response = await axios.get('?key=33500508-b4271a177ba3ac813eaf35292&q=sport&image_type=photo&page=1&per_page=12');
    this.setState({ articles: response.data.hits });
  }

  render() {
      return (
        <div
          style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gridGap: '16px',
              paddingBottom: '24px',
          }}
        >
          <Searchbar />
          <Loader />
          <ImageGallery articles={this.state.articles} />

          {/* <Modal /> */}

        </div>
      );
  }
};
