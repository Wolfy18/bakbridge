import { FormikErrors } from 'formik';
import React from 'react';
declare const ErrorDisplay: React.FC<{
    errors: FormikErrors<{
        asset: AssetProps[];
    }>;
}>;
export default ErrorDisplay;
