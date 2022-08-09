import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginFormData } from '../../assets/data';
import { mapObjectAndAddValue, objectToArray } from '../../utils';
import Input from '../Input';
import { SubmitButton } from '../SubmitButton';

const LoginForm = () => {
  const [fromState, setFormState] = useState(
    mapObjectAndAddValue(loginFormData)
  );
  const arr = objectToArray(loginFormData);

  const handleChange = (e) => {
    setFormState({
      ...fromState,
      [e.target.name]: {
        ...fromState[e.target.name],
        value: e.target.value,
      },
    });
  };
  return (
    <form className="flex flex-col py-8">
      <h1 className="text-4xl mb-8">Login to your account...</h1>
      {arr.map((item) => (
        <Input
          key={item.id}
          item={item}
          value={fromState[item.name].value}
          handleChange={handleChange}
        />
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
