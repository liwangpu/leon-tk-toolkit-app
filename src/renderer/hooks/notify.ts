import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const commonNotifyOption = {
  duration: 2,
  placement: 'bottomRight',
};

const generateNotifyArgs = (props: Partial<ArgsProps>): ArgsProps => {
  return { ...commonNotifyOption, ...props } as any;
};

export function useNotify(): [
  (params: {
    message: string;
    description?: string;
    type?: NotificationType;
  }) => void,
  any,
] {
  const [notify, contextHolder] = notification.useNotification();

  return [
    (props: {
      message: string;
      description?: string;
      type?: NotificationType;
    }) => {
      const { type, message, description } = props;
      const args = generateNotifyArgs({message});
      switch (type) {
        case 'info':
          notify.info(args);
          break;
        case 'warning':
          notify.warning(args);
          break;
        case 'error':
          notify.error(args);
          break;
        default:
          notify.success(args);
          break;
      }
    },
    contextHolder,
  ];
}
