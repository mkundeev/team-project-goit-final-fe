import React from 'react';
import Test from '../components/Test/Test';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetTestQuery } from 'app/testsApi';
import { getStartedTests } from '../app/selectors';

export default function TestPage() {
  const { testId } = useParams();
  useGetTestQuery(testId);
  const tests = useSelector(getStartedTests);
  const test = tests.find(test => test.testId === testId);

  return (
    <>
      <Test test={test} />
    </>
  );
}
