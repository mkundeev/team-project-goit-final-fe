import { useEffect } from 'react';
import { useGetUsetSatisticQuery } from 'app/testsApi';
import { useDispatch } from 'react-redux';
import { resetUser } from 'app/reducer';
import User from 'components/User';

export default function UserPage() {
  const { data, error } = useGetUsetSatisticQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error?.status === 401) {
      dispatch(resetUser());
    }
  }, [dispatch, error]);

  return <div>{data && <User data={data} />}</div>;
}
