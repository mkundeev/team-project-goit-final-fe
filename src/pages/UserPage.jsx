import React from 'react';
import { useGetUsetSatisticQuery } from 'app/testsApi';
import User from 'components/User';

export default function UserPage() {
  const { data } = useGetUsetSatisticQuery();

  return <div>{data && <User data={data} />}</div>;
}
