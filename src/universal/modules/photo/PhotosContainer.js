import { connect } from 'react-redux';

import { actions, selectors } from './reducers';
import Photos from './Photos';

const mapStateToProps = (state, { match }) => ({
  photos: selectors.getPhotos(state, match.params.albumId),
});

const mapDispatchToProps = (dispatch, { match }) => ({
  requestPhotos: () => dispatch(actions.requestPhotos(match.params.albumId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
