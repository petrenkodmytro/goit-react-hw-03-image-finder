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
    textQuery: '',
    images: [],
    pageNumber: 1,
    loading: false, // spiner
    showModal: false,
    error: null,
    totalPage: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    //     Викликається відразу після оновлення компонента в DOM
    // Не викликається при початковому рендері компонента
    // Можна викликати setState(), обов'язково обгорнувши його в умову перевірки зміни попередніх і наступних props або state, щоб не виник нескінченний цикл ререндера (вкладка зависне або впаде).
    // Можна робити HTTP-запити
    let { pageNumber } = this.state;
    const prevSearchValue = prevProps.value;
    const nextSearchValue = this.props.value;
    // const page = this.props.pageNumber;

    if (prevSearchValue !== nextSearchValue) {
      this.setState({ pageNumber: 1 });
    }

    // console.log('prevSearchValue', prevSearchValue);
    // console.log('nextSearchValue', nextSearchValue);

    // Перевіряємо, чи змінились пропси запиту або state сторінки (pageNumber)
    if (
      prevSearchValue !== nextSearchValue ||
      prevState.pageNumber !== pageNumber
    ) {
      // запуск спінера
      this.setState({ loading: true, error: null });

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

// якщо змінився запит скидаємо сторінки на початок
// static getDerivedStateFromProps(nextProps, prevState) {
//   // Викликається перед render() під час монтування та перед усіма наступними викликами render, тобто після оновлення state або props
//   // Можна використовувати для того, щоб встановити state, залежно від props під час кожної їх зміни
//   // Повинен повернути об'єкт, яким буде оновлений стан, або null, якщо нічого оновлювати не потрібно
//   // Немає доступу до this
//   if (prevState.textQuery !== nextProps.value) {
//     // console.log(prevState); //стан
//     // console.log(nextProps); //пропси з Арр
//     return { pageNumber: 1, textQuery: nextProps.value };
//   }
//   return null;
// }
