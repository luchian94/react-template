import { useEffect, useRef } from 'react';
import { RouterProvider } from 'react-router-dom';

import { useJsApiLoader } from '@react-google-maps/api';
import { QueryClientProvider } from '@tanstack/react-query';
import { PrimeReactProvider } from 'primereact/api';
import { Toast } from 'primereact/toast';

import '@/config';
import { MAPS_API_KEY } from '@/constants';
import { queryClient } from '@/core/query-client.ts';
import { useNotificationsStore } from '@/stores/notifications.store.ts';

import { appRouter } from './router/router';

function App() {
  useJsApiLoader({
    id: 'bridges-map',
    googleMapsApiKey: MAPS_API_KEY,
  });
  const toastRef = useRef(null as Toast | null);

  useEffect(() => {
    const sub = useNotificationsStore.subscribe((state) => {
      const notification = state.currentNotification;
      if (notification) {
        toastRef.current?.show(notification);
      }
    });

    return () => {
      sub();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <Toast ref={toastRef} />
        <RouterProvider router={appRouter} />
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}

export default App;
