// import { element } from 'prop-types';
import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

// import s from './User.module.css';
export default function UserChart({ data }) {
  const topics = [...new Set(data.map(el => el.topic))];

  const newData = topics.map((topic, index) => {
    const oneTopic = data.filter(item => item.topic === topic);
    const value = Math.round(
      oneTopic.reduce((acc, item) => (acc += item.percent), 0) / oneTopic.length
    );
    return {
      title: topic,
      value,
      color: topic === 'Testing theory' ? '#C13C37' : '#E38627',
    };
  });

  return (
    <>
      <PieChart
        label={({ dataEntry }) => `${dataEntry.value} %`}
        data={newData}
        lineWidth={30}
        labelStyle={index => ({
          fill: '#fff',

          fontSize: '5px',
          fontFamily: 'Montserrat',
        })}
        labelPosition={85}
        rounded
      />
    </>
  );
}
