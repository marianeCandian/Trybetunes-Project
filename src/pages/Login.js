import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    isDisabled: true,
    user: '',
    loading: false,
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      user: value,
    }, () => {
      const { user } = this.state;
      const lengthUser = user.length;
      const valor = 3;
      this.setState({ isDisabled: lengthUser < valor,
      });
    });
  };

  handleClick = async () => {
    const { user } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name: user });
    history.push('/search');
  };

  render() {
    const { isDisabled, user, loading } = this.state;
    return (
      <div>
        {loading
          ? <Loading />
          : (
            <div data-testid="page-login">
              <form>
                <label htmlFor="name">
                  Insira seu nome:
                  <input
                    type="text"
                    data-testid="login-name-input"
                    id="name"
                    onChange={ this.handleChange }
                    value={ user }
                  />
                </label>
                <button
                  type="button"
                  disabled={ isDisabled }
                  onClick={ this.handleClick }
                  data-testid="login-submit-button"
                >
                  Entrar
                </button>
              </form>
            </div>
          )}
      </div>
    );
  }
}

Login.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}).isRequired;

export default Login;
