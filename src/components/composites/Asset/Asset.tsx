import { Carousel, Collapse, Divider } from 'antd';
import { Card } from 'components/atoms/Card';
import React from 'react';

const Asset: React.FC = () => {
  return (
    <>
      <Card style={{ width: '100%' }}>
        <Divider orientation="left">Attributes</Divider>
        <Collapse
          size={'small'}
          items={[
            {
              key: '1',
              label: 'pant',
              children: <p>Brown</p>,
            },
            {
              key: '2',
              label: 'jacket',
              children: <p>Blue</p>,
            },
            {
              key: '3',
              label: 'Shorts',
              children: <p>Yellow</p>,
            },
          ]}
        />

        <Divider orientation="left">File Attributes</Divider>
        <Collapse
          defaultActiveKey={['1']}
          size={'small'}
          items={[
            {
              key: '1',
              label: 'Files',
              children: (
                <Carousel afterChange={(e) => console.log(e)}>
                  <div>
                    <h3>1</h3>
                  </div>
                  <div>
                    <h3>2</h3>
                  </div>
                  <div>
                    <h3>3</h3>
                  </div>
                  <div>
                    <h3>4</h3>
                  </div>
                </Carousel>
              ),
            },
          ]}
        />
      </Card>
    </>
  );
};

export default Asset;
