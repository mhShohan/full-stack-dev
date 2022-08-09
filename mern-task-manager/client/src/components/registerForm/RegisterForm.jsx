import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mapObjectAndAddValue, objectToArray } from '../../utils';
import { registerFormData } from '../../assets/data';
import Input from '../Input';
import { SubmitButton } from '../SubmitButton';

const RegisterForm = () => {
  const [formState, setFormState] = useState(
    mapObjectAndAddValue(registerFormData)
  );
  const formArr = objectToArray(registerFormData);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: {
        ...formState[e.target.name],
        value: e.target.value,
      },
    });
  };

  return (
    <form className="flex flex-col py-8">
      <h1 className="text-4xl mb-8">Register your account...</h1>
      {formArr.map((item) => (
        <Input
          key={item.id}
          item={item}
          value={formState[item.name].value}
          handleChange={handleChange}
        />
      ))}
      <SubmitButton>Register</SubmitButton>
      <h4 className="text-center mt-2">
        You already have an Account?
        <Link
          to="/"
          className="text-blue-700 hover:underline ease-in duration-150"
        >
          Login Here...
        </Link>
      </h4>
    </form>
  );
};

export default RegisterForm;
