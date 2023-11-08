
// create a header component and export it
import React from 'react';

const Header = () => {
  return (
    <header className='border-b border-gray-300 w-full py-8'>
      <h1 className='text-4xl font-bold'>AI Blog</h1>
      <p className='text-lg text-gray-500 mt-3'>
        Welcome to my AI blog.
      </p>
    </header>
  );
};

export default Header;