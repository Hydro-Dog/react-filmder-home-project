import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import { Dispatch, useState } from 'react';
import './login-screen.component.scss';

interface LoginForm {
  email?: string;
  password?: string;
}

function LoginScreen() {
  const [loginState, setLoginState]: [string, Dispatch<any>] = useState('');

  const onSubmit = (userInfo: LoginForm) => {
    axios
      .post('http://localhost:4000/login', { ...userInfo })
      .then(() => {
        setLoginState('login completed');
      })
      .catch((err) => {
        console.log('err.response: ', err.response);
        setLoginState(err.response.data.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
  });

  return (
    <div>
      <div className="nlf main-container">
        <div className="form-container nlf-column">
          loginState: {loginState}
          <form className="nlf-column" onSubmit={formik.handleSubmit}>
            <div className="mb-10">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mb-10">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
