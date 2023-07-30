import {
  BugOutlined,
  GithubOutlined,
  SketchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';
import './index.less';

/**
 * 全局 Footer
 *
 */
const GlobalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      className="default-footer"
      copyright={`${currentYear} 文州`}
      links={[
        {
          key: 'master',
          title: (
            <>
              <UserOutlined /> 站长：文州
            </>
          ),
          href: 'https://blog.csdn.net/weixin_61093022',
          blankTarget: true,
        },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> 代码仓库
            </>
          ),
          href: 'https://github.com/wenzhou1616/sql-generate-tool-backend',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default GlobalFooter;
