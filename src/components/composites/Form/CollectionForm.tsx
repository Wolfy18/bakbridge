import React, { useState, useRef, useContext } from 'react';
import { Formik } from 'formik';
import {
  Divider,
  Button,
  Tabs,
  Drawer,
  Space,
  Switch,
  Input,
  Spin,
} from 'antd';
import { Asset } from 'components/composites/Asset';
import FormContext from 'context/FormContext';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const CollectionForm: React.FC = () => {
  const { assetCollection, setAssetCollection } = useContext(FormContext);

  const TabPanels: Array<{
    key: string;
    children: JSX.Element;
    label: string;
  }> = assetCollection.map((i: AssetProps, idx: number) => {
    return {
      key: `${i.uuid}-${idx}`,
      children: <Asset {...i} />,
      label: `Asset #${idx + 1}`,
    };
  });

  const newTabIndex = useRef(0);
  const [activeKey, setActiveKey] = useState('0');
  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    setAssetCollection([
      ...assetCollection,
      {
        uuid: 'uuuuuid',
        blockchain: 'ada',
        name: `test added`,
        image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        amount: 1,
      },
    ]);

    console.log(assetCollection, ' <==============');
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    const targetIndex = TabPanels.findIndex((pane) => pane.key === targetKey);
    const newPanes = TabPanels.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } =
        newPanes[
          targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
        ];
      setActiveKey(key);
    }
    setAssetCollection(assetCollection.filter((i) => i.uuid !== targetKey));
  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  const [open, setOpen] = useState<boolean>(false);
  const onCloseConfigDrawer = () => {
    console.log('clsoe drawer!');
    setOpen(false);
  };

  return (
    <div className="relative">
      <Formik
        initialValues={{ name: 'jared' }}
        onSubmit={(values, actions) => {
          console.log('Submitting form......');
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <div className="p-4">
            <Tabs
              hideAdd
              onChange={onChange}
              activeKey={activeKey}
              type="editable-card"
              onEdit={onEdit}
              items={TabPanels}
            />
            <Divider orientation="left"></Divider>
            <div className="flex justify-between max-h-[50px] items-center">
              <div className="grid grid-cols-2 gap-4">
                <Button type="default" onClick={add}>
                  <PlusOutlined /> Add Asset
                </Button>
                <Button type="link" onClick={() => setOpen(!open)}>
                  Config
                </Button>
              </div>
              <div>
                <Button type="default" onClick={submitForm}>
                  <Spin
                    className={`mr-2 ${!isSubmitting ? 'hidden' : null}`}
                    indicator={
                      <LoadingOutlined
                        style={{ fontSize: 14, marginTop: '-3px' }}
                        spin
                      />
                    }
                  />
                  Submit Request
                </Button>
              </div>
            </div>
          </div>
        )}
      </Formik>

      <Drawer
        title="Transaction Configuration"
        placement={'bottom'}
        getContainer={false}
        width={500}
        onClose={onCloseConfigDrawer}
        open={open}
        extra={
          <Space>
            <Button type="default" onClick={onCloseConfigDrawer}>
              Cancel
            </Button>
            <Button type="default" onClick={onCloseConfigDrawer}>
              OK
            </Button>
          </Space>
        }
      >
        <Divider orientation="left">Royalties</Divider>
        <Switch checkedChildren="On" unCheckedChildren="Off" />
        <Input name="percentage" maxLength={64} />
        <Input name="wallet_address" maxLength={64} />
        <Divider orientation="left">Process Automatically</Divider>
        <Switch defaultChecked checkedChildren="On" unCheckedChildren="Off" />
      </Drawer>
    </div>
  );
};

export default CollectionForm;
