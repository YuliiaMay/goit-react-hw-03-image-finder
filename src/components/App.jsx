import React, {Component} from "react";
import ImageGallery from "./ImageGallery/ImageGallery";

import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";






export class App extends Component {
  state = {
    articles: [],
  }
  render() {
      return (
        <div>
          <Searchbar />
          <Loader />
          <ImageGallery articles={this.state.articles} />

          <Modal />

        </div>
      );
  }
};
