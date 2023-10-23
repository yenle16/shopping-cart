import React, { ReactNode } from 'react';
import { Navbar } from '../navbar/Navbar';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col">
      <div className="w-full">
        <Navbar />
      </div>
      <div className={`w-full`}>{children}</div>
    </div>
  );
};

export default MainLayout;
