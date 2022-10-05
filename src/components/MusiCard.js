import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusiCard extends React.Component {
  state = {
    loading: false,
    favoritas: [],
  };

  clickCheckBox = async ({ target }) => {
    const { musicas } = this.props;
    const { favoritas } = this.state;
    this.setState({ loading: true, favoritas: [...favoritas, target.value] });
    await addSong(musicas);
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
              <label htmlFor="favorite">
                Favorita
                <input
                  type="checkbox"
                  id="favorite"
                  data-testid={ `checkbox-music-${trackId}` }
                  value={ trackId }
                  checked={ favoritas.some((favorita) => Number(favorita) === trackId) }
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
}.isRequired;

export default MusiCard;
