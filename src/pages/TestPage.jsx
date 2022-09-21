import React from 'react';
import Test from '../components/Test/Test';
import { useParams } from 'react-router-dom';
import { useGetTestQuery } from 'app/testsApi';

export default function TestPage() {
  const { testId } = useParams();
  const { data } = useGetTestQuery(testId);
  console.log(data);

  console.log(testId);
  return (
    <>
      <Test />
    </>
  );
}
