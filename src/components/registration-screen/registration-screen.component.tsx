import { useFormik } from 'formik';
import { Dispatch, useState } from 'react';
import axios from 'axios';
import './registration-screen.component.scss';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface RegistrationForm {
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

const REGISTER_SUCCESSFULLY_MESSAGE = 'Registered successfully';

function RegistrationScreen() {
  const [registrationState, setRegistrationState]: [string, Dispatch<any>] =
    useState('');

  const validate = (values: RegistrationForm) => {
    const errors: RegistrationForm = {};
    if (!values.username) {
      errors.username = 'Required';
    } else if (values.username.length > 15) {
      errors.username = 'Must be 15 characters or less';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 6) {
      errors.password = 'Must be 6 characters or more';
    }

    if (!values.firstName) {
      errors.firstName = 'Required';
    } else if (values.firstName.length > 15) {
      errors.firstName = 'Must be 15 characters or less';
    }

    if (!values.lastName) {
      errors.lastName = 'Required';
    } else if (values.lastName.length > 20) {
      errors.lastName = 'Must be 20 characters or less';
    }

    return errors;
  };

  const onSubmit = (userInfo: RegistrationForm) => {
    axios
      .post('http://localhost:4000/register', { ...userInfo })
      .then(() => {
        setRegistrationState(REGISTER_SUCCESSFULLY_MESSAGE);
      })
      .catch((err) => {
        setRegistrationState(err.response.data.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    validate,
    onSubmit,
  });

  const formBlock = (
    <form className="nlf-column" onSubmit={formik.handleSubmit}>
      <div className="form-control-container mb-10">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        <div className="error-message">
          {formik.touched.username && formik.errors.username
            ? formik.errors.username
            : null}
        </div>
      </div>
      <div className="form-control-container mb-10">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <div className="error-message">
          {formik.touched.email && formik.errors.email
            ? formik.errors.email
            : null}
        </div>
      </div>
      <div className="form-control-container mb-10">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <div className="error-message">
          {formik.touched.password && formik.errors.password
            ? formik.errors.password
            : null}
        </div>
      </div>
      <div className="form-control-container mb-10">
        <label htmlFor="firstName">First name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        <div className="error-message">
          {formik.touched.firstName && formik.errors.firstName
            ? formik.errors.firstName
            : null}
        </div>
      </div>
      <div className="form-control-container mb-10">
        <label htmlFor="lastName">Last name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        <div className="error-message">
          {formik.touched.lastName && formik.errors.lastName
            ? formik.errors.lastName
            : null}
        </div>
      </div>

      <Button
        className="mb-10"
        variant="contained"
        disabled={!formik.isValid}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );

  return (
    <div>
      <div className="nlf main-container">
        <div className="form-container nlf-column">
          registrationCompleted: {registrationState}
          {registrationState === REGISTER_SUCCESSFULLY_MESSAGE ? (
            <Button className="mb-10" variant="contained">
              <Link to="/">Go Back</Link>
            </Button>
          ) : (
            formBlock
          )}
        </div>
      </div>
    </div>
  );
}

export default RegistrationScreen;
