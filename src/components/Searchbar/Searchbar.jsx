import { Component } from 'react';
import SearchbarForm from './SearchbarForm/SearchbarForm';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { searchImages } from 'api/images';

import styles from './searchbar.module.css';

class Searchbar extends Component {
  state = {
    search: '',
    images: [],
    loading: false,
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { search } = this.state;
    if (search && search !== prevState.search) {
      this.setState({
        loading: true,
        images: [],
      });

      try {
        const { data } = await searchImages(search);
        this.setState({
          images: data?.hits || [],
        });
      } catch (error) {
        console.log('Error:', error.message);
        this.setState({
          error: error.message,
        });
      } finally {
        this.setState({
          loading: false,
        });
      }
    }
    console.log(this.state.images);
  }

  handleSearch = ({ search }) => {
    this.setState({
      search,
    });
  };

  render() {
    const { handleSearch } = this;
    const { images, loading, error } = this.state;
    return (
      <>
        <header className={styles.searchbar}>
          <SearchbarForm onSubmit={handleSearch} />
          {error && <p className={styles.error}>{error}</p>}
          {loading && <p>Loading...</p>}
        </header>
        <div>
          {Boolean(images.length) && <ImageGalleryItem items={images} />}
        </div>
      </>
    );
  }
}

export default Searchbar;
