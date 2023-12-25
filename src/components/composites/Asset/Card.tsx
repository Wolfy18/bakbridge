import React, { PropsWithChildren } from 'react';
import { Carousel, Collapse, Divider } from 'antd';
import { Card as DSCard } from 'antd';

const { Meta } = DSCard;

const Card: React.FC<PropsWithChildren & AssetProps> = ({
  name,
  description,
  image,
  attrs,
  files,
  children,
}) => {
  return (
    <>
      <DSCard
        hoverable
        style={{ width: 360 }}
        cover={<img alt="example" src={image} />}
        className="m-auto"
      >
        <Meta title={name} description={description} />
        {attrs && (
          <>
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
          </>
        )}

        {files && (
          <>
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
          </>
        )}

        {children}
      </DSCard>
    </>
  );
};

export default Card;
