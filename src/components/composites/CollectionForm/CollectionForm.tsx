import React, { useState, useEffect, useRef } from 'react';
import { Formik } from 'formik';
import { Divider, Button, Tabs, Drawer, Spin, message } from 'antd';
import { Asset } from 'components/composites/Asset';
import { EmptyAsset, useFormContext } from 'context/FormContext';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { useSessionContext } from 'context/SessionContext';
import useBakClient from 'client/bakrypt';
import Config from './Config';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const CollectionForm: React.FC = () => {
  const {
    assetCollection,
    setAssetCollection,
    setOpenTxDrawer,
    setTransaction,
  } = useFormContext();
  const { getTransaction, submitRequest } = useBakClient();
  const { transactionUuid } = useSessionContext();

  const [TabPanels, setTabPanels] = useState<
    Array<{
      key: string;
      children: JSX.Element;
      label: string;
    }>
  >([
    {
      key: `asset-0`,
      children: <Asset props={EmptyAsset} idx={0} />,
      label: `Asset #1`,
    },
  ]);

  const newTabIndex = useRef(assetCollection.length);
  const [activeKey, setActiveKey] = useState(`asset-0`);
  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const add = () => {
    const newActiveKey = `asset-${newTabIndex.current++}`;
    const newcol = [...assetCollection, EmptyAsset];
    setAssetCollection(newcol);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    const targetIndex = TabPanels.findIndex((pane) => pane.key === targetKey);

    if (assetCollection.length <= 1) return;

    const newcol = assetCollection.filter(
      (i: AssetProps, idx: number) => idx !== targetIndex
    );

    setAssetCollection(newcol);
    const key =
      newcol.length === targetIndex
        ? `asset-${targetIndex - 1}`
        : `asset-${targetIndex}`;

    setActiveKey(key);
  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  // config & transaction drawer
  const [open, setOpen] = useState<boolean>(false);
  const onCloseConfigDrawer = () => {
    setOpen(false);
  };

  // fetch transaction information
  useEffect(() => {
    (async () => {
      if (!transactionUuid) return;
      try {
        const tx = await getTransaction(transactionUuid);
        setTransaction(tx);
      } catch (error) {
        message.error('Unable to load transaction');
        console.error(error);
      }
    })();
  }, [transactionUuid]);

  // Set panels based on the assetCollection.
  // Memoization can be good here
  useEffect(() => {
    // Update new tabindex
    newTabIndex.current = assetCollection.length;

    // Update panels
    setTabPanels(
      assetCollection.map((i: AssetProps, idx: number) => {
        return {
          key: `asset-${idx}`,
          children: <Asset props={{ ...i }} idx={idx} />,
          label: i.asset_name || `Asset #${idx + 1}`,
        };
      })
    );
  }, [assetCollection]);

  return (
    <div className="relative">
      <Formik
        initialValues={assetCollection}
        onSubmit={async (values, actions) => {
          console.log('Submitting form......');
          console.log(values, ' <--- these are the values');

          try {
            await submitRequest(values);
          } catch (error) {
            message.error('unable to submit request');
            console.log(error);
          }

          actions.setSubmitting(false);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <>
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
                  {!transactionUuid && (
                    <Button
                      type="default"
                      className="flex items-center"
                      onClick={add}
                    >
                      <PlusOutlined /> Asset
                    </Button>
                  )}

                  <Button type="link" onClick={() => setOpen(!open)}>
                    Config
                  </Button>
                </div>
                <div>
                  {transactionUuid ? (
                    <Button
                      type="default"
                      onClick={() => setOpenTxDrawer(true)}
                    >
                      <Spin
                        className={`mr-2 ${!isSubmitting ? 'hidden' : null}`}
                        indicator={
                          <LoadingOutlined
                            style={{ fontSize: 14, marginTop: '-3px' }}
                            spin
                          />
                        }
                      />
                      Show Invoice
                    </Button>
                  ) : (
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
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </Formik>

      <Drawer
        title="Transaction Configuration"
        placement={'right'}
        onClose={onCloseConfigDrawer}
        open={open}
        size={'large'}
        style={{ lineHeight: 'normal' }}
      >
        <Config />
      </Drawer>
    </div>
  );
};

export default CollectionForm;
