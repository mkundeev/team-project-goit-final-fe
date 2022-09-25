import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { getToken } from 'app/selectors';
import { setUser } from 'app/reducer';
import { useGetUserQuery } from 'app/testsApi';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import ResultRoute from 'routes/ResultRoute';
import Header from 'components/Header/Header';

import Loader from 'components/Loader';
import Footer from 'components/Footer';

const AuthorizationPage = lazy(() =>
  import(
    './pages/AuthorizationPage/AuthorizationPage' /* webpackChunkName: "authorization" */
  )
);
const HomePage = lazy(() =>
  import('pages/HomePage' /* webpackChunkName: "home" */)
);
const ResultPage = lazy(() =>
  import('pages/ResultPage' /* webpackChunkName: "result" */)
);
const MaterialsPage = lazy(() =>
  import('pages/MaterialsPage' /* webpackChunkName: "material" */)
);
const TestPage = lazy(() =>
  import('pages/TestPage' /* webpackChunkName: "test" */)
);
const ContactsPage = lazy(() =>
  import('pages/ContactsPage' /* webpackChunkName: "contacts" */)
);
function App() {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const { data } = useGetUserQuery('', { skip: !token });

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch]);
  return (
    <div className="wrapper">
      <Suspense
        fallback={
          <div className="loader">
            <Loader />
            {/* <RingLoader color="#1212dc" size={250} /> */}
          </div>
        }
      >
        <Header />
        <Routes>
          <Route
            path="/authorization"
            element={
              <PublicRoute>
                <AuthorizationPage />
              </PublicRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/test/:testId"
            element={
              <PrivateRoute>
                <TestPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/result"
            element={
              <ResultRoute>
                <ResultPage />
              </ResultRoute>
            }
          />
          <Route
            path="/material"
            element={
              <PrivateRoute>
                <MaterialsPage />
              </PrivateRoute>
            }
          />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route
            path="*"
            element={
              <PublicRoute>
                <AuthorizationPage />
              </PublicRoute>
            }
          />
        </Routes>
      </Suspense>
      <Footer />
      <ToastContainer
        autoClose={4000}
        closeButton={false}
        hideProgressBar={true}
      />
    </div>
  );
}

export default App;
