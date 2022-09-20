import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from 'app/selectors';

export default function PrivateRoute({ children }) {
  const token = useSelector(getToken);
  return <>{token ? children : <Navigate to="/authorization" replace />}</>;
}
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
