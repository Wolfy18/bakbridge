import React, { useRef } from 'react';
import { Carousel, Divider, Skeleton, Button } from 'antd';
import { Card as DSCard } from 'antd';
import File from '../../atoms/File';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CarouselRef } from 'antd/es/carousel';

const { Meta } = DSCard;

const Card: React.FC<AssetProps> = ({
  name,
  description,
  image,
  attrs,
  files,
}) => {
  const ref = useRef<CarouselRef | null>(null);

  // const [attrsValue, setAttrsValue] = useState<string>('');

  // const renderValue = (
  //   value: string | number | [] | object,
  //   reduced = '',
  //   key?: string
  // ) => {
  //   if (key) {
  //     reduced += `${key} \n`;
  //   }

  //   if (Array.isArray(value)) {
  //     for (let index = 0; index < value.length; index++) {
  //       renderValue(value[index], reduced);
  //     }
  //   } else if (typeof value === 'object') {
  //     for (const [q, entry] of Object.entries(value)) {
  //       renderValue(entry, reduced, q);
  //     }
  //   } else {
  //     reduced += `\t\t${value}`;
  //   }
  // };

  const attrsReducer = (acc: string[], key: string) => {
    if (!attrs) return acc;

    if (key) {
      acc.push(key);
    }

    // if (Array.isArray(value)) {
    //   for (let index = 0; index < value.length; index++) {
    //     renderValue(value[index], reduced);
    //   }
    // } else if (typeof value === 'object') {
    //   for (const [q, entry] of Object.entries(value)) {
    //     renderValue(entry, reduced, q);
    //   }
    // } else {
    //   reduced += `\t\t${value}`;
    // }

    return acc;
  };

  // useEffect(() => {
  //   if (attrs) {
  //     const reduced = renderValue(attrs);
  //     if (reduced) setAttrsValue(reduced);
  //   }
  // }, [renderValue, attrs]);

  const next = () => {
    ref?.current?.next();
  };

  const prev = () => {
    ref?.current?.prev();
  };
  return (
    <>
      <DSCard
        hoverable
        style={{ width: 360, minHeight: 250 }}
        cover={<File url={image} alt={name} />}
        className="m-auto"
      >
        {name || description ? (
          <Meta title={name} description={description} />
        ) : (
          <Skeleton />
        )}

        {attrs && (
          <>
            <Divider orientation="left">Attributes</Divider>
            {
              <p>
                {Object.keys(attrs)
                  .reduce(attrsReducer, [])
                  .map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
              </p>
            }
          </>
        )}

        {files && (
          <>
            <Divider orientation="left">Files</Divider>
            <div className="relative">
              {files.length > 1 && (
                <>
                  <Button
                    type="default"
                    shape="circle"
                    icon={<LeftOutlined />}
                    size={'small'}
                    onClick={prev}
                    className="absolute left-2 z-50 top-[50%] shadow bg-transparent hover:bg-primary"
                  />
                  <Button
                    type="default"
                    shape="circle"
                    icon={<RightOutlined />}
                    size={'small'}
                    onClick={next}
                    className="absolute right-2 z-50 top-[50%] shadow bg-transparent hover:bg-primary"
                  />
                </>
              )}

              <Carousel ref={ref}>
                {files.map((i, idx) => {
                  return (
                    <div key={`${idx}-${i.name}`}>
                      <File url={i.src} alt={i.name} />
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </>
        )}
      </DSCard>
    </>
  );
};

export default Card;
