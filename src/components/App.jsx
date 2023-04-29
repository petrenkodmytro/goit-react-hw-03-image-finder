import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    textQuery: '',
    // pageNumber: 1,
  };

  // записываем запрос поиска в App из Searchbar
  handleSubmit = searchValue => {
    this.setState({ textQuery: searchValue, pageNumber: 1 });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />

        <Layout>
          <ImageGallery
            value={this.state.textQuery}
            // pageNumber={this.state.pageNumber}
          />
        </Layout>

        <GlobalStyle />
      </>
    );
  }
}
