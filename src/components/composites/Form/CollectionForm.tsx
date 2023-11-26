import React from 'react';

import { Formik, Form } from 'formik';
import { Divider, Row, Col, Button } from 'antd';
import { Asset } from 'components/composites/Asset';

const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };

const CollectionForm: React.FC = () => {
  return (
    <Formik
      initialValues={{ name: 'jared' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {() => (
        <Form>
          <Button type="primary">Submit Request</Button>
          <Button type="primary">+ Add Asset</Button>

          <Button type="link">Config</Button>
          <Divider orientation="left">Responsive</Divider>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={12}>
              <Asset />
            </Col>
            <Col className="gutter-row" span={12}>
              <div style={style}>col-6</div>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default CollectionForm;
