import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Formik } from 'formik';
import { Divider, Button, Tabs, Drawer, Spin, message } from 'antd';
import { Asset } from 'components/composites/Asset';
import { EmptyAsset, useFormContext } from 'context/FormContext';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { useSessionContext } from 'context/SessionContext';
import useBakClient from 'client/bakrypt';
import Config from './Config';
import * as Yup from 'yup';

const collectionSchema = Yup.object().shape({
  asset: Yup.array().of(
    Yup.object().shape({
      blockchain: Yup.string().required().default('ada'),
      name: Yup.string().required(),
      asset_name: Yup.string(),
      image: Yup.string().required(),
      description: Yup.string(),
      amount: Yup.number().required(),
      attrs: Yup.array().of(
        Yup.object().shape({
          key: Yup.string().required(),
          value: Yup.string().required(),
        })
      ),
      files: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required(),
          src: Yup.string().required(),
          mediaType: Yup.string().nullable(),
        })
      ),
    })
  ),
});

const CollectionForm: React.FC = () => {
  const {
    assetCollection,
    setAssetCollection,
    setOpenTxDrawer,
    setTransaction,
    transaction,
  } = useFormContext();
  const { getTransaction, submitRequest } = useBakClient();
  const { transactionUuid } = useSessionContext();

  // Set panels based on the assetCollection.
  const TabPanels = useMemo(
    () =>
      assetCollection.map((i: AssetProps, idx: number) => {
        if (i.asset_name) {
          i['asset_name'] = i['asset_name'].replace(/[^a-zA-Z0-9]/g, '');
        }

        const tabName =
          i['asset_name'] ||
          i.name.substring(0, 32).replace(/[^a-zA-Z0-9]/g, '');

        return {
          key: `asset-${idx}`,
          children: <Asset props={i} idx={idx} />,
          label: tabName || `Asset #${idx + 1}`,
        };
      }),
    [assetCollection]
  );

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

  useEffect(() => {
    // Update new tabindex
    newTabIndex.current = assetCollection.length;
    console.log('Collection changed ---------');
  }, [assetCollection]);

  return (
    <div className="relative">
      <Formik
        initialValues={{
          asset: assetCollection,
        }}
        validationSchema={collectionSchema}
        onSubmit={async (values, actions) => {
          console.log('Submitting form......');
          console.log(values);
          try {
            // Update collection with assets withe shame name
            const reducedCollection = values.asset.reduce(
              (acc: AssetProps[], i) => {
                if (!i.asset_name) return acc;

                const dup = acc.filter((j) => j.asset_name === i.asset_name);
                if (dup.length) {
                  dup[0].amount += i.amount;
                } else {
                  acc.push(i);
                }
                return acc;
              },
              []
            );

            // update attrs
            const formatted = reducedCollection.reduce(
              (acc: OutputAssetProps[], obj: AssetProps) => {
                const attributes = {};

                if (obj.attrs) {
                  obj.attrs.forEach((i) => {
                    Object.assign(attributes, {
                      [i.key as string]: i.value,
                    });
                  });
                }

                const updated = { ...obj, attrs: { ...attributes } };

                acc.push(updated);

                return acc;
              },
              []
            );
            console.log(formatted, '< ----- formatted');
            const req = await submitRequest(formatted);

            if (req.length && req[0]) {
              const tx = req[0].transaction;

              if (tx && typeof tx === 'object') {
                setTransaction(tx);
              } else if (tx) {
                // get transaction
                const transaction = await getTransaction(tx);
                setTransaction(transaction);
              }

              setOpenTxDrawer(true);
            }
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
                  {!transaction && (
                    <Button
                      type="default"
                      className="flex items-center"
                      onClick={add}
                    >
                      <PlusOutlined /> Asset
                    </Button>
                  )}
                </div>
                <div>
                  <Button type="link" onClick={() => setOpen(!open)}>
                    Configuration
                  </Button>
                  {transaction ? (
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
