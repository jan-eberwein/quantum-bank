// client/app/layout.tsx
import { ReactNode } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import '../styles/globals.css'; // Import global styles

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
