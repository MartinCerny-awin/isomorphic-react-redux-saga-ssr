import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions, selectors } from './albums';

class AlbumsContainer extends Component {
  constructor(props) {
    super(props);
    if (!this.props.albums.length) {
      this.props.requestAlbums();
    }
  }

  render() {
    const { albums } = this.props;

    return (
      <div>
        <h1>Albums</h1>
        <ul>
          {albums.map(album => <li>{album.title}</li>)}
        </ul>
      </div>
    );
  }
}

AlbumsContainer.propTypes = {
  requestAlbums: PropTypes.func.isRequired,
  albums: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string })).isRequired,
};

const mapStateToProps = state => ({
  albums: selectors.getAlbums(state),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsContainer);
