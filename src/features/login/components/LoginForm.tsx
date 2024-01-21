import { BaseSyntheticEvent, ChangeEvent, useEffect, useState } from 'react';
import { Form } from 'react-router-dom';

import { KeyValueObj } from 'models/misc.ts';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';

import { useAuthErrorMessage, useAuthIsLoading, useAuthSignIn } from '@/auth/auth.store';

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({} as KeyValueObj);

  const signIn = useAuthSignIn();
  const isLoading = useAuthIsLoading();
  const errorMessage = useAuthErrorMessage();

  const validateValues = (formData: KeyValueObj) => {
    const errors: { emailRequired?: string; passwordRequired?: string } = {};
    if (formData.email == '') {
      errors.emailRequired = 'This field is required';
    }
    if (formData.password == '') {
      errors.passwordRequired = 'This field is required';
    }
    return errors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setErrors(validateValues(formData));
    setSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      void signIn({
        username: formData.email,
        password: formData.password,
      });
    }
  }, [errors]);

  return (
    <Form className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>
        <div className="mt-2">
          <InputText
            id="email"
            name="email"
            type="email"
            className={`${errors.emailRequired ? 'p-invalid' : ''}`}
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
        </div>
        <div className="mt-2">
          <InputText
            id="password"
            name="password"
            type="password"
            className={`${errors.passwordRequired ? 'p-invalid' : ''}`}
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      </div>

      {errorMessage && (
        <Message className="w-full justify-start" severity="error" text={errorMessage} />
      )}

      <div className="mt-2 text-right text-sm">
        <a href="#" className="font-semibold text-primary">
          Forgot password?
        </a>
      </div>

      <div>
        <Button
          type="submit"
          className="w-full"
          label="Sign in"
          onClick={handleSubmit}
          loading={isLoading}
        ></Button>
      </div>
    </Form>
  );
};
