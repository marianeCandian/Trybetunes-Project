import React from 'react';
import PropTypes from 'prop-types';

class MusiCard extends React.Component {
  render() {
    const { trachName, previewUrl } = this.props;
    return (
      <div>
        <h4>{ trachName }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusiCard.propTypes = {
  trachName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusiCard;
