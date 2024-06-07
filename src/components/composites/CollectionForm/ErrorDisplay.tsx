import { DownOutlined } from '@ant-design/icons';
import { Tree, TreeDataNode } from 'antd';
import { FormikErrors } from 'formik';
import React from 'react';

const ErrorLine: React.FC<{ title: string; error: string }> = ({
  title,
  error,
}) => {
  return <p>{`${title}:${error.replace(/[asset]+[[0-9]+]\./, ' ')}`}</p>;
};

const ErrorDisplay: React.FC<{
  errors: FormikErrors<{ asset: AssetProps[] }>;
}> = ({ errors }) => {
  const { asset: assetErrors } = errors as { asset?: AssetProps[] };

  if (!assetErrors || !assetErrors.length) return <></>;

  const treeData = assetErrors.reduce((acc: TreeDataNode[], obj, idx) => {
    if (!obj) return acc;
    const errors = [];
    let i = 0;
    for (const [title, error] of Object.entries(obj)) {
      errors.push({
        title: <ErrorLine title={title} error={error} />,
        error,
        key: `${idx}-error-0-${i}`,
      });
      i++;
    }

    acc.push({
      title: `Asset #${idx + 1}`,
      key: `${idx}-error`,
      children: errors,
    });

    return acc;
  }, []);

  const treeRoot = [{ title: 'Errors', key: '0', children: treeData }];

  return <Tree showLine switcherIcon={<DownOutlined />} treeData={treeRoot} />;
};

export default ErrorDisplay;
