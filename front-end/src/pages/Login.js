import * as React from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isDataCorect, setIsDataCorect] = React.useState(false);

  const EMAIL_REGEX = /^(\w|\.)+@[a-z]+\.com$/;
  const PASSWORD_REGEX = /.{6,}/;

  const emailValidate = (emailInput) => (EMAIL_REGEX.test(emailInput));
  const passwordValidate = (passwordInput) => PASSWORD_REGEX.test(passwordInput);

  const makeLogin = async () => {
    const ok = 200;
    const notFound = 404;
    try {
      const result = await axios.post('http://localhost:3001/user', { email, password });
      console.log(result.status);
      if (result.status === ok) {
        setIsDataCorect(false);
      }
    } catch (error) {
      if (error.response.status === notFound) {
        setIsDataCorect(true);
      }
      console.log(error.response.status);
    }
    // console.log(result.status);
    // console.log(isDataCorect);
  };

  React.useEffect(() => {
    if (emailValidate(email) && passwordValidate(password)) return setIsDisabled(false);
    setIsDisabled(true);
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    makeLogin();
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">
          Email:
          <input
            data-testid="common_login__input-email"
            type="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            id="email"
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            data-testid="common_login__input-password"
            type="password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            id="password"
          />
        </label>
        <button
          type="submit"
          data-testid="common_login__button-login"
          disabled={ isDisabled }
        >
          Login
        </button>

        <button
          type="button"
          data-testid="common_login__button-register"
        >
          Ainda não tenho Conta
        </button>

        {isDataCorect && (
          <p data-testid="common_login__element-invalid-email">
            Usuário não Encontrado
          </p>)}
      </form>
    </div>
  );
}

export default Login;
