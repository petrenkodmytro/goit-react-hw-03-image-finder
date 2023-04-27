import PropTypes from 'prop-types';
import { ImageItem, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ item }) => {
  return (
    <ImageItem>
      <Img src={item.webformatURL} alt={item.tags} />
    </ImageItem>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  // onImageClick: PropTypes.func.isRequired,
};
