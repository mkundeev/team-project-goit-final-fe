import { useEffect } from 'react';
import Test from '../components/Test/Test';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTestQuery } from 'app/testsApi';
import { setUser } from 'app/reducer';
import { getStartedTestsIds } from 'app/selectors';

export default function TestPage() {
  const { testId } = useParams();
  const dispatch = useDispatch();
  const startedTestIds = useSelector(getStartedTestsIds);
  const { data, isLoading } = useGetTestQuery(testId, {
    skip: startedTestIds?.includes(testId),
  });

  useEffect(() => {
    if (data) {
      dispatch(setUser({ startedTests: data }));
    }
  }, [dispatch, data]);

  return <>{!isLoading && <Test testId={testId} />}</>;
}
