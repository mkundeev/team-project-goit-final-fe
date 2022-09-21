import React from 'react';
import Test from '../components/Test/Test';
import { useParams } from 'react-router-dom';

export default function TestPage() {
  const { testId } = useParams();
  console.log(testId);
  return (
    <>
      <Test />
    </>
  );
}
