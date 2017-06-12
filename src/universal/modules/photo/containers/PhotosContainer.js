import { connect } from 'react-redux';

import { actions, selectors } from 'modules/photo/reducers';
import Photos from 'modules/photo/components/Photos';

const mapStateToProps = (state, { match }) => ({
  photos: selectors.getPhotos(state, match.params.albumId),
});

const mapDispatchToProps = (dispatch, { match }) => ({
  requestPhotos: () => dispatch(actions.requestPhotos(match.params.albumId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
