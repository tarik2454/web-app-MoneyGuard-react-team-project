import { Route, Routes } from 'react-router';
import Layout from './Layout/Layout';
import HomeTab from './HomeTab/HomeTab';
import SummaryPage from 'pages/SummaryPage/SummaryPage';
import RegistrationPage from 'pages/RegistrationPage/RegistrationPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import NotFound from 'pages/NotFound/NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { currentUser } from 'redux/Auth/operations';
import { Currency } from './Currency/Currency';
import Loader from './Loader/Loader';
import { Navigate } from 'react-router-dom';

import { fetchTransactions } from 'redux/TransactionsList/operations';
import { getIsAuth } from 'redux/Auth/selectors';
import { PrivateRoute } from 'HOC/PrivateRoute';
import { PublicRoute } from 'HOC/PublicRoute';

export const App = () => {
  const isRefresh = useSelector(state => state.user.isRefresh);
  const isLoggedIn = useSelector(getIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());

    dispatch(fetchTransactions());
  }, [dispatch]);

  return isRefresh ? (
    <Loader />
  ) : (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Layout /> : <Navigate to="/login" />}
      >
        <Route
          index
          element={
            <PrivateRoute>
              <HomeTab />
            </PrivateRoute>
          }
        />
        <Route
          path="summary"
          element={
            <PrivateRoute>
              <SummaryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="currency"
          element={
            <PrivateRoute>
              <Currency />
            </PrivateRoute>
          }
        />
      </Route>
      <Route
        path="register"
        element={
          <PublicRoute>
            <RegistrationPage />
          </PublicRoute>
        }
      />
      <Route
        path="login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
