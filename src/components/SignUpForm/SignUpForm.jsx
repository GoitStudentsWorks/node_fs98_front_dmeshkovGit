import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from '../SignUpForm/SignUpForm.module.css';
import Icon from '../../shared/components/Icon/Icon';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import '../../translate/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { register as registerUser } from '../../redux/user/operations';
import GoogleAuthBtn from '../../shared/components/GoogleAuthBtn/GoogleAuthBtn';
import { selectIsLoading } from '../../redux/user/selectors';
import AuthLoader from '../../shared/components/AuthLoader/AuthLoader';
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Repeat Password is required'),
});

export default function SignUpForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const loading = useSelector(selectLoading);
  // const error = useSelector(selectError);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // об'єкт конфігурації параметрів хука useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema), // інтеграція схеми валідації yup в react-hook-form.
  });

  const onSubmit = async data => {
    console.log(data);
    // try {
    //   // запит на реєстрацію user
    //   const result = await dispatch(registerUser(data));
    //   if (registerUser.fulfilled.match(result)) {
    //     reset();
    //     navigate('/tracker');
    //   } else if (registerUser.rejected.match(result)) {
    //     setErrorMessage(result.payload.message || 'Registration failed');
    //   }
    // } catch (err) {
    //   setErrorMessage(err.message);
    // }
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ToastContainer />
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputGroup}>
          <label>{t('Email user')}</label>
          <input
            type="text"
            placeholder={t('Enter email')}
            className={clsx(
              css.inputGroupInput,
              errors.email && css.inputError,
            )}
            {...register('email')}
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>
        <div className={css.inputGroup}>
          <label>{t('Password user')}</label>
          <div className={css.passwordContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={t('Enter password')}
              className={clsx(
                css.inputGroupInput,
                errors.password && css.inputError,
              )}
              {...register('password')}
            />
            <button
              type="button"
              className={css.passwordToggle}
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <Icon className={css.icon} id="eye" width={20} height={20} />
              ) : (
                <Icon className={css.icon} id="eyeOff" width={20} height={20} />
              )}
            </button>
          </div>
          {errors.password && (
            <p className={css.error}>{errors.password.message}</p>
          )}
        </div>

        <div className={css.inputGroup}>
          <label>{t('Repeat password')}</label>
          <div className={css.passwordContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={t('Repeat password')}
              {...register('repeatPassword')}
              className={clsx(
                css.inputGroupInput,
                errors.repeatPassword && css.inputError,
              )}
            />
            <button
              type="button"
              className={css.passwordToggle}
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <Icon className={css.icon} id="eye" width={20} height={20} />
              ) : (
                <Icon className={css.icon} id="eyeOff" width={20} height={20} />
              )}
            </button>
          </div>
          {errors.repeatPassword && (
            <p className={css.error}>{errors.repeatPassword.message}</p>
          )}
        </div>

        {errors.repeatPassword && (
          <p className={css.error}>{errors.repeatPassword.message}</p>
        )}
      </div>
      <button
        className={css.submitButton}
        type="submit"
        // disabled={loading}
      >
        {isLoading ? <AuthLoader /> : {t('Register user form')}}
      </button>
      <GoogleAuthBtn />
    </form>
</>
  );
}
