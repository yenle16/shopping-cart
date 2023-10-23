import React, { ReactNode } from 'react';

const NoHeaderLayout = ({ children }: { children: ReactNode }) => {
  return <div className={`w-full`}>{children}</div>;
};

export default NoHeaderLayout;
