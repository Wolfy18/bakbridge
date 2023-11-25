import React from 'react';
import './App.css';
import Card from './components/atoms/Card/Card';
import { SimpleLayout } from './components/composites/Layout';
import { Space } from 'antd';

function App() {
  return (
    <SimpleLayout>
      <Space size={'middle'}>
        <Card />

        <Card />
        <Card />
        <Card />
      </Space>
    </SimpleLayout>
  );
}

export default App;
