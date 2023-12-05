import React, { PropsWithChildren } from 'react';

import { Layout } from 'antd';
import Link from 'antd/es/typography/Link';

const { Header, Footer, Content } = Layout;

interface Props {
  enableHeader?: boolean;
}

const SimpleLayout: React.FC<Props & PropsWithChildren> = ({
  enableHeader,
  children,
}) => {
  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: 'transparent',
  };

  const contentStyle: React.CSSProperties = {
    textAlign: 'left',
    minHeight: 120,
    lineHeight: '120px',
    color: '#a2a2a2',
    backgroundColor: 'transparent',
  };

  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#a6a6a6',
    backgroundColor: 'transparent',
  };

  return (
    <Layout className="max-w-[600px] m-auto bg-transparent">
      {enableHeader && <Header style={headerStyle}>Header</Header>}

      <Content style={contentStyle}>{children}</Content>

      <Footer style={footerStyle}>
        Powered by{' '}
        <Link href="https://bakrypt.io" target="_blank" rel="nofollow">
          bakrypt.io
        </Link>
      </Footer>
    </Layout>
  );
};

export default SimpleLayout;
