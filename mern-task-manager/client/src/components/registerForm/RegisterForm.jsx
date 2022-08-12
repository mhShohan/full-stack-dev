import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { mapObjectAndAddValue, objectToArray } from '../../utils';
import { registerFormData } from '../../assets/data';
import Input from '../Input';
import { SubmitButton } from '../SubmitButton';

const RegisterForm = () => {
  const [formState, setFormState] = useState(
    mapObjectAndAddValue(registerFormData)
  );
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
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

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      firstName: formState.firstName.value,
      lastName: formState.lastName.value,
      email: formState.email.value,
      password: formState.password.value,
      confirmPassword: formState.confirmPassword.value,
    };
    if (data.password !== data.confirmPassword) {
      setErrors({
        ...errors,
        password: 'Please Enter the same password',
        confirmPassword: 'Please Enter the same password',
      });
    }
    try {
      await axios.post('http://localhost:4000/api/v1/user/register', data);
      window.location = '/dashboard';
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  }
  useEffect(() => {
    let timer1 = setTimeout(
      () =>
        setErrors({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }),
      3 * 1000
    );

    return () => {
      clearTimeout(timer1);
    };
  }, [errors.email, errors.firstName, errors.lastName]);

  return (
    <form className="flex flex-col py-8" onSubmit={handleSubmit}>
      <h1 className="text-4xl mb-8">Register your account...</h1>
      {formArr.map((item) => (
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
