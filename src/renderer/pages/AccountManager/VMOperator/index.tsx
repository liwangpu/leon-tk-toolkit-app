import { Button } from 'antd';
import styles from './index.module.scss';
import { observer } from 'mobx-react-lite';

export interface IVMOperatorProps {
  canLaunch?: boolean;

  onLaunch(): void;

  onShutDown(): void;
}

const VMOperator: React.FC<IVMOperatorProps> = observer(props => {
  const { canLaunch, onLaunch, onShutDown } = props;
  return (
    <div className={styles['operator']}>
      <Button type='primary' disabled={!canLaunch} onClick={onLaunch}>打开</Button>
      <Button danger type='primary' disabled={canLaunch} onClick={onShutDown}>关闭</Button>
    </div>
  );
});

VMOperator.displayName = 'VMOperator';

export default VMOperator;
