import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import axios from 'axios';

import styles from './image-gallery.module.css';

class ImageGallery extends Component {
  state = {
    loading: false,
    images: [],
    error: null,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    const apiKey = '40978321-f1efcc4bfa3c901177745f4fe';

    axios
      .get(
        `https://pixabay.com/api/?q=audi&page=1&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(({ data }) => {
        this.setState({
          loading: false,
        });
        const images = data.hits || [];
        if (images.length) {
          this.setState({
            images,
          });
        }
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: error.message,
        });
      });
  }

  render() {
    const { loading, images, error } = this.state;
    return (
      <div>
        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {Boolean(images.length) && <ImageGalleryItem items={images} />}
      </div>
    );
  }
}

export default ImageGallery;
