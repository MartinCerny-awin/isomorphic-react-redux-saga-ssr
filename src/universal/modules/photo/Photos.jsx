import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class Photos extends Component {
  static defaultProps = {
    photos: [],
  };

  static propTypes = {
    requestPhotos: PropTypes.func.isRequired,
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        thumbnailUrl: PropTypes.string.isRequired,
      }),
    ),
  };

  componentWillMount() {
    this.props.requestPhotos();
  }

  render() {
    return (
      <div>
        <h2>Album</h2>

        {this.props.photos
          ? this.props.photos.map(({ id, thumbnailUrl }) => <img key={id} src={thumbnailUrl} alt={thumbnailUrl} />)
          : 'Loading...'}
      </div>
    );
  }
}
