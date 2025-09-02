"use client";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';

const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page A', uv: 500, pv: 2400, amt: 2400}, {name: 'Page A', uv: 300, pv: 2400, amt: 2400},];

export const LineCharts = () => (
  <LineChart width={600} height={300} data={data}>
    <CartesianGrid />
    <Line dataKey="uv"/>
    <XAxis dataKey="name" />
    <YAxis />
    <Legend />
  </LineChart>
);