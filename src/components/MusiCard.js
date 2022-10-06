import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusiCard extends React.Component {
  state = {
    loading: false,
    favoritas: false,
  };

  componentDidMount() {
    this.backFavorites();
  }

  backFavorites = async () => {
    const { trackId } = this.props;
    const response = await getFavoriteSongs();
    response.some((sav) => sav.trackId === trackId && this.setState({
      favoritas: sav,
    }));
  };

  clickCheckBox = async ({ target }) => {
    const { musicas } = this.props;
    this.setState({
      favoritas: target.checked,
      loading: true,
    });
    if (target.checked) {
      await addSong(musicas);
    } else {
      await removeSong(musicas);
    }
    this.setState({ loading: false });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favoritas } = this.state;
    return (
      <div data-testid="page-MusicCard">
        {!loading
          ? (
            <div>
              <h4>{ trackName }</h4>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
              <label htmlFor={ trackId }>
                Favorita
                <input
                  type="checkbox"
                  id={ trackId }
                  data-testid={ `checkbox-music-${trackId}` }
                  checked={ favoritas }
                  onChange={ this.clickCheckBox }
                />
              </label>
            </div>) : <Loading />}
      </div>
    );
  }
}

MusiCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  musicas: PropTypes.shape({}),
}.isRequired;

export default MusiCard;
