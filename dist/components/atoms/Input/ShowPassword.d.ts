import React, { PropsWithChildren } from 'react';
import { InputProps } from 'antd';
interface Props extends InputProps {
    copytoclipboard?: boolean | string;
}
declare const ShowPassword: React.FC<PropsWithChildren<Props>>;
export default ShowPassword;
