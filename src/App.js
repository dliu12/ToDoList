import React from 'react';
import './style.css';
import { BackgroundCard } from './components';
import { TaskContextProvider } from './contexts';
import WebFont from 'webfontloader';

export default function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Playfair Display SC', 'Roboto'],
      },
    });
  }, []);
  return (
    <TaskContextProvider>
      <div className="App-container">
        <BackgroundCard />
      </div>
    </TaskContextProvider>
  );
}
