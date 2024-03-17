import React, { useState, useEffect, useRef } from 'react';
import { Formik } from 'formik';
import { Divider, Button, Tabs, Drawer, Spin, message } from 'antd';
import { Asset } from 'components/composites/Asset';
import { EmptyAsset, useFormContext } from 'context/FormContext';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { useSessionContext } from 'context/SessionContext';
import useBakClient from 'client/bakrypt';
import Config from './Config';
// import { insertLineBreaks } from 'utils';
import * as Yup from 'yup';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const collectionSchema = Yup.object().shape({
  asset: Yup.array().of(
    Yup.object().shape({
      blockchain: Yup.string().required().default('ada'),
      name: Yup.string().required(),
      asset_name: Yup.string().required(),
      image: Yup.string(),
      description: Yup.string(),
      amount: Yup.number().required(),
      // files?: AssetFileProps[];
      // attrs?: Attrs;
    })
  ),
});

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
    console.log('changed collection');
    // Update panels
    setTabPanels(
      assetCollection.map((i: AssetProps, idx: number) => {
        console.log(i.name, i.asset_name, '< ------');
        return {
          key: `asset-${idx}`,
          children: <Asset props={i} idx={idx} />,
          label: i.asset_name || `Asset #${idx + 1}`,
        };
      })
    );
  }, [assetCollection]);

  // const handleFormChange = (
  //   e: React.FormEvent<HTMLFormElement>,
  //   errors: FormikErrors<{
  //     asset: AssetProps[];
  //   }>,
  //   touched: FormikTouched<{
  //     asset: AssetProps[];
  //   }>
  // ) => {
  //   const inputElement = e.target as HTMLInputElement;
  //   const key = inputElement.name.split('.')[1] as keyof AssetProps;
  //   console.log(e, ' <--------- ');
  //   const currentIdx = Number(activeKey.replace(/[^0-9]/g, ''));
  //   console.log(currentIdx);
  //   const assetUpdate = { ...assetCollection[currentIdx] };
  //   // Use square bracket notation to update the property dynamically
  //   Object.assign(assetUpdate, {
  //     [key]:
  //       key !== 'description'
  //         ? inputElement.value
  //         : insertLineBreaks(inputElement.value).split('\n'),
  //   });

  //   // Set asset name if name is set but no asset name
  //   // if (!assetNameRef.current?.input?.value.length && assetUpdate.name) {
  //   if (assetUpdate.name) {
  //     Object.assign(assetUpdate, {
  //       asset_name: assetUpdate.name.substring(0, 32),
  //     });
  //   }

  //   Object.assign(assetUpdate, {
  //     asset_name: assetUpdate.asset_name?.replace(/[^a-zA-Z0-9]/g, ''),
  //   });

  //   // Append error status
  //   console.log(errors, touched);

  //   const newcol = [...assetCollection];
  //   newcol[currentIdx] = assetUpdate;
  //   setAssetCollection(newcol);
  // };

  return (
    <div className="relative">
      <Formik
        initialValues={{
          asset: assetCollection,
        }}
        validationSchema={collectionSchema}
        onSubmit={async (values, actions) => {
          console.log('Submitting form......');
          console.log(values, ' <--- these are the values');

          try {
            // Update collection with assets withe shame name
            const reducedCollection = assetCollection.reduce(
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

            await submitRequest(reducedCollection);
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
