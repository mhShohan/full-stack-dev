import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loginFormData } from '../../assets/data';
import { mapObjectAndAddValue, objectToArray } from '../../utils';
import Input from '../Input';
import { SubmitButton } from '../SubmitButton';
import axios from 'axios';

const LoginForm = () => {
  const [formState, setFormState] = useState(
    mapObjectAndAddValue(loginFormData)
  );
  const [errors, setErrors] = useState({ email: '', password: '' });
  const arr = objectToArray(loginFormData);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: {
        ...formState[e.target.name],
        value: e.target.value,
      },
    });
  };
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const data = {
        email: formState.email.value,
        password: formState.password.value,
      };
      await axios.post(`${process.env.REACT_APP_URL}/user/login`, data);
      window.location = '/dashboard';
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  }
  useEffect(() => {
    let timer1 = setTimeout(
      () => setErrors({ email: '', password: '' }),
      3 * 1000
    );

    return () => {
      clearTimeout(timer1);
    };
  }, [errors.email]);
  return (
    <form className="flex flex-col py-8" onSubmit={handleSubmit}>
      <h1 className="text-4xl mb-8">Login to your account...</h1>
      {arr.map((item) => (
        <div key={item.id} className="flex flex-col">
          <Input
            item={item}
            value={formState[item.name].value}
            handleChange={handleChange}
          />
          {errors[item.name] ? (
            <p className="text-red-600 text-center  text-sm">
              {errors[item.name]}
            </p>
          ) : (
            ''
          )}
        </div>
      ))}

      <SubmitButton>Login</SubmitButton>
      <h4 className="text-center mt-2">
        You haven't an Account?
        <Link
          to="/register"
          className="text-blue-700 hover:underline ease-in duration-150"
        >
          Register Here...
        </Link>
      </h4>
    </form>
  );
};

export default LoginForm;
