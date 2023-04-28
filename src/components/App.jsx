import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';


export class App extends Component {
  state = {
    textQuery: '',
  };

  // записываем запрос поиска в App из Searchbar
  handleSubmit = searchValue => {
    this.setState({ textQuery: searchValue });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />

        <Layout>
          <ImageGallery value={this.state.textQuery} />
        </Layout>

        
        <GlobalStyle />
      </>
    );
  }
}