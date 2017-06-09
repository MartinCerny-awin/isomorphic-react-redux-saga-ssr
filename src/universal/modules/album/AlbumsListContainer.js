import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AlbumsList from './AlbumsList';
import { actions, selectors } from './reducers';

const mapStateToProps = state => ({
  albums: selectors.getAlbums(state),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsList);
