import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryList } from './ImageGallery.styled';
// import { Loader } from './Loader/Loader';
// import { Button } from './Button/Button';
import { fetchData } from 'api/fetchData';
import 'react-toastify/dist/ReactToastify.css';
import {
  notificationMassege,
  notificationOptions,
} from 'components/Notification/Notification';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    pageNumber: 1,
    loading: false, // spiner
    showModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { pageNumber } = this.state;
    const prevValue = prevProps.value;
    const nextValue = this.props.value;
    console.log(prevValue);
    console.log(nextValue);

    // Перевіряємо, чи змінились пропси запиту або сторінки.
    if (
      prevValue !== nextValue ||
      prevState.pageNumber !== this.state.pageNumber
    ) {
      // пішов запит на бекенд
      try {
        const response = await fetchData(nextValue, pageNumber);
        console.log(response.hits);
        this.setState({ images: [...response.hits] });
      } catch (error) {}
    }

    toast.error(`${notificationMassege}`, notificationOptions);
  }
  render() {
    return (
      <GalleryList>
        {this.state.images.map(img => (
          <ImageGalleryItem key={img.id} item={img} />
        ))}
      </GalleryList>
      // <Button />
      // <Loader />
    );
  }
}
