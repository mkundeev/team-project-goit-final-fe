import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { getToken } from 'app/selectors';
import { setUser } from 'app/reducer';
import { useGetUserQuery } from 'app/testsApi';
import RingLoader from 'react-spinners/RingLoader';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import Header from 'components/Header/Header';
import Chart from './components/Chart/Chart';

const AuthorizationPage = lazy(() =>
  import(
    './pages/AuthorizationPage/AuthorizationPage' /* webpackChunkName: "authorization" */
  )
);
const HomePage = lazy(() =>
  import('pages/HomePage' /* webpackChunkName: "home" */)
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
    <div>
      <Chart />
      {/* <Suspense
        fallback={
          <div className="loader">
            <RingLoader color="#1212dc" size={250} />
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
      </Suspense> */}
      <ToastContainer
        autoClose={4000}
        closeButton={false}
        hideProgressBar={true}
      />
    </div>
  );
}

export default App;
