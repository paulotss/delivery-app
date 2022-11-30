import * as React from 'react';
import axios from 'axios';

function Register() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isDataCorect, setIsDataCorect] = React.useState(false);

  const createUser = async () => {
    const ok = 201;
    const notFound = 404;
    console.log('awd');
    try {
      const result = await axios.post('http://localhost:3001/user/register', { name, email, password });
      console.log(result);
      if (result.status === ok) {
        setIsDataCorect(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === notFound) {
        setIsDataCorect(true);
      }
      console.log(error.response.status);
    }
  };

  const EMAIL_REGEX = /^(\w|\.)+@[a-z]+\.com$/;
  const PASSWORD_REGEX = /.{6,}/;
  const NAME_REGEX = /.{12,}/;

  const emailValidate = (emailInput) => (EMAIL_REGEX.test(emailInput));
  const passwordValidate = (passwordInput) => PASSWORD_REGEX.test(passwordInput);
  const nameValidate = (nameInput) => NAME_REGEX.test(nameInput);

  React.useEffect(() => {
    if (nameValidate(name)
      && emailValidate(email)
      && passwordValidate(password)) return setIsDisabled(false);
    setIsDisabled(true);
  }, [name, email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="common_register__input-name"
            type="text"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
            id="name"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="common_register__input-email"
            type="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            id="email"
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            data-testid="common_register__input-password"
            type="password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            id="password"
          />
        </label>
        <button
          type="submit"
          data-testid="common_register__button-register"
          disabled={ isDisabled }
        >
          CADASTRAR
        </button>

        {isDataCorect && (
          <p data-testid="common_register__element-invalid_register">
            Usuário não Cadastrado
          </p>)}
      </form>
    </div>
  );
}

export default Register;
