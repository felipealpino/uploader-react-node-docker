import { render } from 'react-dom';

import { App } from './App';
import { FilesProvider } from './hooks/useFiles';

render(
  <FilesProvider>
    <App />
  </FilesProvider>,
  document.getElementById('root')
);
