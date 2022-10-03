import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      user: '',
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const name = await getUser();
    this.setState({
      user: name.user,
      isLoading: false,
    });
  };

  render() {
    const { isLoading, user } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div>
        <header data-testid="header-component">
          <p data-testid="header-user-name">{ user }</p>
          <nav>
            <Link
              to="/search"
              data-testid="link-to-search"
            />
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
            />
            <Link
              to="/profile"
              data-testid="link-to-profile"
            />
          </nav>
        </header>
      </div>
    );
  }
}

export default Header;
