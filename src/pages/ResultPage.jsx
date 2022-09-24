import React from 'react';
import Chart from 'components/Chart/Chart';
import { useSelector } from 'react-redux';
import { getResult } from 'app/selectors';

export default function ResultPage() {
  const result = useSelector(getResult);
  return (
    <>
      {result && (
        <div>
          <Chart result={result} />
        </div>
      )}
    </>
  );
}
