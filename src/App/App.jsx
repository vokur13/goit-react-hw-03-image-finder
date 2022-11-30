import React, { Component } from 'react';
import { Searchbar } from 'components/Searchbar';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import * as API from 'services/api';
import { ImageGalleryError } from 'components/ImageGalleryError';
import { ImageGallery } from 'components/ImageGallery';
import { ImageGalleryPending } from 'components/ImageGalleryPending';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'css/styles.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  static defaultProps = {
    step: 1,
    initialValue: 1,
  };

  state = {
    page: 1,
    query: '',
    gallery: [],
    total: null,
    totalHits: null,
    error: false,
    status: Status.IDLE,
  };

  handleFormSubmit = ({ query }) => {
    const newQuery = query.trim().toLowerCase();
    if (newQuery === '') {
      return toast.warn('Please let us know your query item');
    }
    this.setState({
      page: 1,
      query: newQuery,
      gallery: [],
      total: null,
      totalHits: null,
    });
  };

  handleMoreImage = () => {
    const { step } = this.props;
    this.setState(prevState => ({
      page: prevState.page + step,
    }));
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, total, totalHits } = this.state;

    if (prevState.totalHits !== totalHits && totalHits > 0) {
      toast.success(`Hooray! We found ${totalHits} images.`);
    }

    if (totalHits > 0 && total > 0 && total === totalHits) {
      toast.warn("We're sorry, but you've reached the end of search results.");
    }

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({
          status: Status.PENDING,
        });
        const { totalHits, hits } = await API.getGallery(query, page);
        if (hits.length === 0) {
          this.setState({ status: Status.REJECTED });
          return toast.error(
            `Sorry, there are no images matching your search query for '${query}'. Please try again.`
          );
        }
        this.setState(prevState => ({
          status: Status.RESOLVED,
          gallery: [...prevState.gallery, ...hits],
          total: prevState.total + hits.length,
          totalHits: totalHits,
        }));
      } catch (error) {
        this.setState({ error: true, status: Status.REJECTED });
        console.log(error);
        toast.error(`Sorry, something goes wrong: ${error.message}`);
      }
    }
  }

  render() {
    const { query, gallery, error, status, total, totalHits } = this.state;

    if (status === 'idle') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <div>Please let us know your query item</div>
        </>
      );
    }

    if (status === 'pending') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGalleryPending query={query} data={gallery} />
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGalleryError message={error.message} />
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery data={gallery} />
          {total < totalHits && (
            <Box display="flex" justifyContent="center">
              <Button type="button" onClick={this.handleMoreImage}>
                Load more
              </Button>
            </Box>
          )}
        </>
      );
    }
  }
}
