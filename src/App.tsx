import { RouterProvider } from 'react-router-dom';
import { QueryProvider, UIProvider } from '~/app/providers';
import { router } from '~/app/routes';
import { ScannerProvider } from './app/providers/ScannerProvider';

// import '~app/styles/global.css';

function App() {
  return (
    <UIProvider>
      <QueryProvider>
        <RouterProvider router={router} />
        <ScannerProvider />
      </QueryProvider>
    </UIProvider>
  );
}

export default App;