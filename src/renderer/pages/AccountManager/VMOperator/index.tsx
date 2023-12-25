import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import styles from './index.module.scss';

export interface IVMOperatorProps {
  canLaunch?: boolean;
  onLaunch(): void;
  onShutDown(): void;
  onLogin(): void;
  onRegister(): void;
}

const VMOperator: React.FC<IVMOperatorProps> = observer((props) => {
  const { canLaunch, onLaunch, onShutDown, onLogin, onRegister } = props;
  const canLogin = !canLaunch;
  const canRegister = !canLaunch;

  return (
    <div className={styles['operator']}>
      <Button type="primary" disabled={!canLaunch} onClick={onLaunch}>
        打开
      </Button>
      <Button disabled={!canLogin} onClick={onLogin}>
        登录
      </Button>
      <Button disabled={!canRegister} onClick={onRegister}>
        注册
      </Button>
      <Button danger type="primary" disabled={canLaunch} onClick={onShutDown}>
        关闭
      </Button>
    </div>
  );
});

VMOperator.displayName = 'VMOperator';

export default VMOperator;
