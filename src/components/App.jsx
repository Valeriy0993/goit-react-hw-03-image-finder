import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

import styles from './app.module.css';

export const App = () => {
  return (
    <div className={styles.App}>
      <Searchbar />

      <ImageGallery />
    </div>
  );
};

export default App;
