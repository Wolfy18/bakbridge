import React from 'react';
import './App.css';
import { SimpleLayout } from 'components/composites/Layout';
import { CollectionForm } from 'components/composites/Form';
// import { Button, notification, NotificationArgsProps, Space } from 'antd';
import FormContext from 'context/useFormContext';
import { Drawer as ConfigDrawer } from 'components/composites/Config';
import SessionContext from 'context/useSessionContext';
import { Drawer as TransactionDrawer } from 'components/composites/Transaction';
// import { FormContextProps } from 'antd/es/form/context';

// type NotificationType = 'success' | 'info' | 'warning' | 'error';

const App: React.FC<SessionContextProps> = (props) => {
  // const [api, contextHolder] = notification.useNotification();

  // const [alert, setNotification] = useState<NotificationArgsProps>({
  //   message: null,
  //   title: null,
  //   type: 'info',
  // });

  //   const openNotificationWithIcon = (type: NotificationType) => {
  //     api[type]({
  //       message: 'Notification Title',
  //       description:
  //         'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  //     });
  //   };

  return (
    <SessionContext.Provider value={{ ...props }}>
      <SimpleLayout>
        <FormContext.Provider value={{}}>
          <CollectionForm />
          <ConfigDrawer />
        </FormContext.Provider>
      </SimpleLayout>
      <TransactionDrawer />
    </SessionContext.Provider>
  );
};

export default App;
