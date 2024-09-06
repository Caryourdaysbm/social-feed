import React from 'react';
import Feed from './components/Feed';
import './App.css';

const App = () => (
  <div className="flex flex-col justify-center ">
    <div className='fixed w-full top-0 bg-gray-600'><h1 className="flex justify-center text-3xl font-bold m-3 mt-16 mb-16" >Social Media Feed</h1></div>
    <Feed />
  </div>
);

export default App;
