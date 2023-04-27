import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';

// render > didMount > getItem > setState > update > render > didUpdate > setItem

export class App extends Component {
  state = {
    textQuery: '',
  };
  // записываем запрос поиска в App из Searchbar
  handleSubmit = searchValue => {
    this.setState({ textQuery: searchValue.query.trim().toLowerCase() });
    // console.log(searchValue.query.trim().toLowerCase());
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />

        <Layout>
          <ImageGallery value={this.state.textQuery} />
        </Layout>

        <ToastContainer />
        <GlobalStyle />
      </>
    );
  }
}
