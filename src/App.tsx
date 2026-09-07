import { RouterProvider } from 'react-router-dom';
import { QueryProvider, UIProvider } from '~app/providers';
import { router } from '~app/routes';

import '~app/styles/global.css';

function App() {
  return (
    <UIProvider>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </UIProvider>
  );
}

export default App;