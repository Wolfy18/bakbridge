import React, { PropsWithChildren, useCallback } from 'react';
import { Button, InputProps, notification, Input, message } from 'antd';

interface Props extends InputProps {
  copytoclipboard?: boolean | string;
}

const ShowPassword: React.FC<PropsWithChildren<Props>> = ({
  value,
  placeholder,
  copytoclipboard,
}) => {
  const [api, contextHolder] = notification.useNotification();
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const toggleVissible = useCallback(() => {
    setPasswordVisible((prevState) => !prevState);
    // copytoclipboard the text inside the text field

    if (!value || !copytoclipboard) return;
    if (passwordVisible) return;
    navigator.clipboard.writeText(String(value));

    message.info('Value copied to clipboard', 6);

    setTimeout(() => setPasswordVisible(false), 6000);
  }, [passwordVisible, api, copytoclipboard, value]);

  return (
    <div style={{ display: 'flex', columnGap: '1rem' }}>
      {contextHolder}
      <Input.Password
        placeholder={placeholder}
        visibilityToggle={{
          visible: passwordVisible,
          onVisibleChange: () => toggleVissible(),
        }}
        value={value}
      />
      <Button
        style={{ width: 80 }}
        onClick={() => {
          toggleVissible();
        }}
      >
        {passwordVisible ? 'Hide' : 'Show'}
      </Button>
    </div>
  );
};

export default ShowPassword;
