import { ReactNode } from 'react';
import { Layout } from '~widgets/Layout/Layout';

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  return <Layout>{children}</Layout>;
};