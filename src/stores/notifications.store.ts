import { ToastMessage } from 'primereact/toast';
import { create } from 'zustand';

interface NotificationsStore {
  currentNotification: ToastMessage | undefined;
}

export const useNotificationsStore = create<NotificationsStore>()(() => ({
  currentNotification: undefined,
}));

export const showNotification = (notification: ToastMessage) =>
  useNotificationsStore.setState({ currentNotification: notification });
