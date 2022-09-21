import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import RingLoader from 'react-spinners/RingLoader';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import Contacts from 'components/Contacts/Contacts';

const AuthorizationPage = lazy(() =>
  import('pages/AuthorizationPage' /* webpackChunkName: "authorization" */)
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
  return (
    <div>
      <Suspense
        fallback={
          <div className="loader">
            <RingLoader color="#1212dc" size={250} />
          </div>
        }
      >
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
            path="/test"
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
      </Suspense>
      <ToastContainer
        autoClose={4000}
        closeButton={false}
        hideProgressBar={true}
      />
    </div>
  );
}

export default App;
