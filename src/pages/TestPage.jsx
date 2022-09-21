import React from 'react';
import Test from '../components/Test/Test';
import { useParams } from 'react-router-dom';
import { useGetTestQuery } from 'app/testsApi';

export default function TestPage() {
  const { topic } = useParams();
  const { data } = useGetTestQuery(topic);
  console.log(data);

  console.log(topic);
  return (
    <>
      <Test />
    </>
  );
}
