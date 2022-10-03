import React from 'react';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="page-album">Albuns</h1>
      </div>
    );
  }
}

export default Album;
