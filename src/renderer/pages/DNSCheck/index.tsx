import {memo} from 'react';
import styles from './index.module.scss';

const DNSCheck: React.FC = memo(props => {

  return (
    <div className={styles['checker']}>
      <iframe className={styles['checker__content']} src="https://whoer.net/zh" frameBorder="0"/>
    </div>
  );
});

DNSCheck.displayName = 'DNSCheck';

export default DNSCheck;
