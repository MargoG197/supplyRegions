import { RouterProvider } from 'react-router-dom';
import { QueryProvider, UIProvider } from '~app/providers';
import { LayoutProvider } from '~app/providers/LayoutProvider';
import { router } from '~app/routes';
import '~app/styles/global.css';

function App() {
  return (
    <UIProvider>
      <QueryProvider>
        <LayoutProvider>
          <RouterProvider router={router} />
        </LayoutProvider>
      </QueryProvider>
    </UIProvider>
  );
}

export default App;