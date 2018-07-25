/**
 *
 * Asynchronously loads the component for TemplateView
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
