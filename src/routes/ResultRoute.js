import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getResult, getToken } from 'app/selectors';

export default function ResultRoute({ children }) {
  const result = useSelector(getResult);
  const token = useSelector(getToken);

  return <>{result && token ? children : <Navigate to="/home" replace />}</>;
}
ResultRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
