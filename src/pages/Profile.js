import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="page-profile">Perfil</h1>
      </div>
    );
  }
}

export default Profile;
