/**
 *
 * Asynchronously loads the component for AnnotationItem
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
