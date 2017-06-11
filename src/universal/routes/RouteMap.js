// webpack.NormalModuleReplacementPlugin doesn't handle replacement in src/client
// we need to do replacemenet for development here
// Development and Production SSR use sync.jsx, Production Client uses async.jsx
import * as RouteMap from './async';

export default RouteMap;
