import { notification } from 'antd';

export function useNotify(): [(params: { message: string, description?: string }) => void, any] {
  const [notify, contextHolder] = notification.useNotification();

  return [
    (params: { message: string, description?: string }) => {
      notify.success({
        description: params.description || '温馨提示',
        message: params.message || '操作成功!',
        duration: 2,
        placement: 'bottomRight'
      });
    },
    contextHolder
  ];
}
