import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notificationMassege, notificationOptions } from 'components/Notification/Notification';

// render > didMount > getItem > setState > update > render > didUpdate > setItem

export class App extends Component {
  state = {
    textQuery: '',
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
    toast.error(`${notificationMassege}`, notificationOptions);
  };

  render() {
    return (
      <>
        <Searchbar />
        <Layout>
          <ToastContainer />
          <GlobalStyle />
        </Layout>
      </>
    );
  }
}
