import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h4 data-testid="page-search">Search</h4>
      </div>
    );
  }
}

export default Search;
