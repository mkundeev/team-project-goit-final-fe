import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from 'app/selectors';

export default function PublicRoute({ children }) {
  const token = useSelector(getToken);

  return <>{!token ? children : <Navigate to="/home" replace />}</>;
}
PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
