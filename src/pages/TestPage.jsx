import { useEffect } from 'react';
import Test from '../components/Test/Test';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTestQuery } from 'app/testsApi';
import { setUser, resetUser } from 'app/reducer';
import { getStartedTestsIds } from 'app/selectors';

export default function TestPage() {
  const { testId } = useParams();
  const dispatch = useDispatch();
  const startedTestIds = useSelector(getStartedTestsIds);
  const { data, isLoading, error } = useGetTestQuery(testId, {
    skip: startedTestIds?.includes(testId),
  });

  useEffect(() => {
    if (data) {
      dispatch(setUser({ startedTests: data }));
    }
    if (error?.status === 401) {
      dispatch(resetUser());
    }
  }, [dispatch, data, error?.status]);

  return <>{!isLoading && <Test testId={testId} />}</>;
}
