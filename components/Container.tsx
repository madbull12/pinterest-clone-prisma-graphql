import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <main className='px-4 pb-16 pt-8  max-w-7xl mx-auto'>{children}</main>;
};

export default Container;
