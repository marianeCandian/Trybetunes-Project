import React from 'react';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h3 data-testid="page-favorites">Favoritos</h3>
      </div>
    );
  }
}

export default Favorites;
