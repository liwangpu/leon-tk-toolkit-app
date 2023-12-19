import { memo } from 'react';
import styles from './/index.module.scss';
import { Breadcrumb } from 'antd';

export interface IPageProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
}

const Page: React.FC<IPageProps> = memo(props => {
  const { header, children } = props;
  return (
    <div className={styles['page']}>
      <div className={styles['page']}>
        {header && (
          <div className={styles['page__header']}>{header}</div>
        )}
        {children && (
          <div className={styles['page__content']}>{children}</div>
        )}
      </div>
    </div>
  );
});

Page.displayName = 'Page';

export default Page;
