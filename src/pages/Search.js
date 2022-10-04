import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loadin from './Loading';

class Search extends React.Component {
  state = {
    isDesabled: true,
    cantor: '',
    loading: false,
    albuns: [],
    cantorRecuperado: '',
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

  handleClick = async () => {
    this.setState({ loading: true });
    const { cantor } = this.state;
    const album = await searchAlbumsAPI(cantor);
    this.setState({
      cantorRecuperado: cantor,
      loading: false,
      albuns: album,
      cantor: '',
    });
  };

  render() {
    const { isDesabled, cantor, loading, albuns, cantorRecuperado } = this.state;
    return (
      <div>
        <Header />
        { loading
          ? <Loadin />
          : (
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
                  onClick={ this.handleClick }
                >
                  Pesquisar
                </button>
              </form>
              <div>
                {
                  albuns.length > 0
                    ? <p>{`Resultado de álbuns de: ${cantorRecuperado}`}</p>
                    : <p>Nenhum álbum foi encontrado</p>
                }
                { albuns.map((album) => (
                  <div key={ album.collectionId }>
                    <img src={ album.artworkUrl100 } alt={ album.colletionName } />
                    <h2>{ album.collectionName }</h2>
                    <p>{ album.artistaName }</p>
                    <Link
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default Search;
