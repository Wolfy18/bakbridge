import { createContext, useState } from 'react';

interface FormContextProps {
  setNotification?: typeof useState;
}

const FormContext = createContext<FormContextProps>({});

export default FormContext;
