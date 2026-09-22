// SSR entry used only at build time by scripts/prerender.mjs.
// Never shipped to the browser.

import { renderToString } from 'react-dom/server'
import PageShell from './components/PageShell.jsx'
import { byPath } from './routes.js'

export function render(path) {
  const route = byPath(path)
  if (!route || route.kind === 'app') return ''
  // navigate=null → anchors keep their real href and no handler is attached
  // on the server. The client attaches one on hydration.
  return renderToString(<PageShell path={path} navigate={null} />)
}

export { ROUTES, contentRoutes, ORIGIN } from './routes.js'
export { QA } from './content/faqData.js'
