import React, { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { searchImages } from 'api/images';

import styles from './image-gallery.module.css';

class ImageGallery extends Component {
  state = {
    search: '',
    loading: false,
    images: [],
    error: null,
    page: 1,
    modalOpen: false,
    imageDetails: {},
  };

  componentDidMount() {
    this.fetchImages();
  }

  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (search && (search !== prevState.search || page !== prevState.page)) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    const { search, page, images } = this.state;

    try {
      this.setState({
        loading: true,
      });
      const { data } = await searchImages(search, 12, page);
      const newImages = data?.hits || [];

      const uniqueImagesSet = new Set([...images, ...newImages]);
      const uniqueImages = Array.from(uniqueImagesSet);

      this.setState({
        images: uniqueImages,
      });
    } catch (error) {
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      this.fetchImages
    );
  };

  handleSearch = ({ search }) => {
    this.setState({
      search,
      images: [],
      page: 1,
    });
  };

  showModal = largeImageURL => {
    this.setState({
      modalOpen: true,
      imageDetails: {
        largeImageURL,
      },
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      imageDetails: {},
    });
  };

  render() {
    const { handleSearch, loadMore, showModal, closeModal } = this;
    const { loading, images, error, modalOpen, imageDetails } = this.state;

    const isImages = Boolean(images.length);
    return (
      <>
        <header className={styles.searchbar}>
          <Searchbar onSubmit={handleSearch} />
        </header>
        <div>
          {loading && <div className={styles.loader}></div>}
          {error && <p className={styles.error}>{error}</p>}
          {isImages && (
            <ImageGalleryItem showModal={showModal} items={images} />
          )}
          {isImages && (
            <div className={styles.buttonContainer}>
              <Button onClick={loadMore} type="button">
                Load more
              </Button>
            </div>
          )}
        </div>
        {modalOpen && (
          <Modal close={closeModal}>
            <img src={imageDetails.largeImageURL} alt="images" />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGallery;
