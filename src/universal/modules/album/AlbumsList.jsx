import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class AlbumsList extends Component {
  static defaultProps = {
    albums: [],
  };

  static propTypes = {
    requestAlbums: PropTypes.func.isRequired,
    albums: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ),
  };

  constructor(props) {
    super(props);

    this.props.requestAlbums();
  }

  render() {
    return (
      <div>
        {this.props.albums
          ? this.props.albums.map(({ id, title }) =>
            (<div key={id}>
              <Link to={`/albums/${id}`}>{title}</Link>
            </div>),
            )
          : 'Loading...'}
      </div>
    );
  }
}
