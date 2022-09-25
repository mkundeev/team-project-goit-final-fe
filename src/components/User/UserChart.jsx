import { element } from 'prop-types';
import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

import s from './User.module.css';
export default function UserChart() {
  const dataMock = [
    { title: 'One', value: 10, color: '#E38627', colorText: '#fff' },
    { title: 'Two', value: 15, color: '#C13C37', colorText: '#fff' },
    { title: 'Three', value: 20, color: '#6A2135', colorText: '#fff' },
  ];
  return (
    <>
      <PieChart
        label={({ dataEntry }) => `${dataEntry.value}%`}
        data={dataMock}
        lineWidth={30}
        labelStyle={index => ({
          fill: dataMock[index].colorText,

          fontSize: '5px',
          fontFamily: 'Montserrat',
        })}
        labelPosition={85}
        rounded
      />
    </>
  );
}
