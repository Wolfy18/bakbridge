import React from 'react';
import { Rule } from 'antd/lib/form';
declare const FileUploader: React.FC<{
    name: string | (string | number)[];
    initialValue?: string | null;
    status?: '' | 'error' | 'warning';
    error?: string;
    rules?: Rule[];
    className?: string;
    label?: string;
    disabled?: boolean;
}>;
export default FileUploader;
