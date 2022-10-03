import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    isDesabled: true,
    cantor: '',
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      cantor: value,
    }, () => {
      const { cantor } = this.state;
      const lengthCantor = cantor.length;
      const valor = 2;
      this.setState({ isDesabled: lengthCantor < valor,
      });
    });
  };

  render() {
    const { isDesabled, cantor } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
              value={ cantor }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isDesabled }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
