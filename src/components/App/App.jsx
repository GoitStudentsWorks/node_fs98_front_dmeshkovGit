import { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import RestrictedRoute from '../Routes/RestrictedRoute';
import PrivateRoute from '../Routes/PrivateRoute';
import '../App/App.css';
// import WelcomeSection from '../WelcomeSection/WelcomeSection';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';
import SignInPage from '../../pages/SignInPage/SignInPage';
import TrackerPage from '../../pages/TrackerPage/TrackerPage';
import SharedLayout from '../SharedLayout/SharedLayout';
import HomePage from '../../pages/HomePage/HomePage';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { refreshUserToken } from '../../redux/user/operations';
import { Loader } from '../../shared/components/Loader/Loader';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

function App() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUserToken());
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-center" />

      <SharedLayout>
        <h3>{i18n.language}</h3>
        <div>
          <button onClick={() => i18n.changeLanguage('en')}>English</button>
          <button onClick={() => i18n.changeLanguage('uk')}>Українська</button>
        </div>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/"
              element={
                <RestrictedRoute
                  component={<HomePage />}
                  redirectTo="/tracker"
                />
              }
            />
            <Route
              path="/signup"
              element={
                <RestrictedRoute
                  component={<SignUpPage />}
                  redirectTo="/tracker"
                />
              }
            />
            <Route
              path="/signin"
              element={
                <RestrictedRoute
                  component={<SignInPage />}
                  redirectTo="/tracker"
                />
              }
            />
            <Route
              path="/tracker"
              element={
                <PrivateRoute component={<TrackerPage />} redirectTo="/" />
              }
            />
          </Routes>
        </Suspense>
      </SharedLayout>
    </>
  );
}

export default App;
