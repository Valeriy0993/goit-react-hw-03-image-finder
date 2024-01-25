import styles from './image-gallery-item.module.css';

const ImageGalleryItem = ({ items }) => {
  const elements = items.map(({ id, webformatURL, largeImageURL }) => (
    <li className={styles.imageGalleryItem} key={id}>
      <img
        className={styles.imageGalleryItemImage}
        src={webformatURL}
        alt="images"
      />
      <a href={largeImageURL} target="_blank" rel="noopener noreferrer"></a>
    </li>
  ));

  return <ul className={styles.imageGallery}>{elements}</ul>;
};

export default ImageGalleryItem;
