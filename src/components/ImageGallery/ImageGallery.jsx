import { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, GalleryList } from './ImageGallery.styled';
import { fetchData } from 'api/fetchData';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export class ImageGallery extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    pageNumber: 1,
    loading: false, // spiner
    showModal: false,
    error: null,
    totalPage: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { pageNumber } = this.state;
    const prevSearchValue = prevProps.value;
    const nextSearchValue = this.props.value;
    // console.log(prevSearchValue);
    // console.log(nextSearchValue);

    // Перевіряємо, чи змінились пропси запиту або state сторінки (pageNumber)
    if (
      prevSearchValue !== nextSearchValue ||
      prevState.pageNumber !== pageNumber
    ) {
      // запуск спінера
      this.setState({ loading: true, error: null });
      // якщо змінився запит скидаємо сторінки на початок
      if (prevSearchValue !== nextSearchValue) {
        this.setState({ pageNumber: this.props.pageNumber });
      }
      // пішов запит на бекенд
      try {
        const response = await fetchData(nextSearchValue, pageNumber);
        console.log('запит:', nextSearchValue);
        console.log('номер сторінки:', pageNumber);
        this.setState(prevState => ({
          images:
            pageNumber === 1
              ? response.data.hits
              : [...prevState.images, ...response.data.hits],
          totalPage: response.data.totalHits,
        }));
      } catch (error) {
        this.setState({ error: 'Something wrong. Please try again.' });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  onLoadMore = () => {
    this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));
  };

  onOpenModal = (imgUrl, tag) => {
    this.setState({ showModal: true, imgUrl, tag });
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <>
        <GalleryList>
          {this.state.images.map(img => (
            <ImageGalleryItem
              key={img.id}
              item={img}
              openModal={this.onOpenModal}
            />
          ))}
        </GalleryList>

        {/* модалка */}
        {this.state.showModal && (
          <Modal closeModal={this.onCloseModal}>
            <img src={this.state.imgUrl} alt={this.state.tag} />
          </Modal>
        )}

        {/* спінер */}
        <Loader isLoading={this.state.loading} />

        {/* кнопка завантажити ще */}
        {this.state.totalPage / 12 > this.state.pageNumber && (
          <Button loadMore={this.onLoadMore} />
        )}

        {/* нічого не знайшло */}
        {this.state.totalPage === 0 && (
          <Alert>
            'Sorry, there are no images matching your search query. Please try
            again.'
          </Alert>
        )}

        {/* помилка запиту */}
        {this.state.error && <Alert>{this.state.error}</Alert>}
      </>
    );
  }
}

// async componentDidUpdate(prevProps, prevState) {
//   const { pageNumber } = this.state;
//   const prevSearchValue = prevProps.value;
//   const nextSearchValue = this.props.value;
//   // console.log(prevSearchValue);
//   // console.log(nextSearchValue);
//   // якщо змінився запит скидаємо сторінки на початок
//   if (prevSearchValue !== nextSearchValue) {
//     this.setState({ pageNumber: 1 });
//   }
//   console.log(this.props.pageNumber);
//   // Перевіряємо, чи змінились пропси запиту або state сторінки (pageNumber)
//   if (
//     prevSearchValue !== nextSearchValue ||
//     prevState.pageNumber !== pageNumber
//   ) {
//     // запуск спінера
//     this.setState({ loading: true, error: null });
//     // пішов запит на бекенд
//     try {
//       const response = await fetchData(nextSearchValue, pageNumber);
//       console.log(pageNumber);
//       this.setState({
//         images:
//           pageNumber === 1
//             ? response.data.hits
//             : [...prevState.images, ...response.data.hits],
//         totalPage: response.data.totalHits,
//       });
//     } catch (error) {
//       this.setState({ error: 'Something wrong. Please try again.' });
//     } finally {
//       this.setState({ loading: false });
//     }
//   }
// }
