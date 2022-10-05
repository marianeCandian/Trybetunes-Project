import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusiCard from '../components/MusiCard';

class Album extends React.Component {
  state = {
    musicas: [],
  };

  componentDidMount() {
    this.getMusic();
  }

  getMusic = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const musicas = await getMusics(id);
    this.setState({
      musicas,
    });
  };

  render() {
    const { musicas } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          { musicas.filter((item, index) => index === 0)
            .map((musica) => (
              <div key={ musica.artistName }>
                <h5 data-testid="album-name">
                  {`Collection Name: ${musica.collectionName}`}
                </h5>
                <img src={ musica.artworkUrl100 } alt={ musica.collectionName } />
                <p data-testid="artist-name">
                  {`Artist Name: ${musica.artistName}`}
                </p>
              </div>
            ))}
          <div>
            {
              musicas.filter((item, index) => index !== 0)
                .map((albuns, index) => (
                  <MusiCard
                    key={ index }
                    trackName={ albuns.trackName }
                    previewUrl={ albuns.previewUrl }
                    trackId={ albuns.trackId }
                  />
                ))
            }
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
