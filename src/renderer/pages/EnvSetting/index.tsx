import React, { useEffect } from 'react';
import { Button, Col, Form, Row } from 'antd';
import LanguageSelect from '../../components/LanguageSelect';
import styles from './index.module.scss';
import { getAppStore } from '../../stores';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useNotify } from '../../hooks';

const appStore = getAppStore();

const EnvSetting: React.FC = observer(() => {

  const { envStore } = appStore;

  const [form] = Form.useForm();
  const [notify, contextHolder] = useNotify();

  const handleSave = async () => {
    try {
      const config = await form.validateFields();
      envStore.setEnv(config);
      notify({
        message: '保存成功!'
      });
    } catch (errors) {
      console.log(`errors:`, errors);
    }
  };

  useEffect(() => {
    envStore.loadEnv();
    form.setFieldsValue(toJS(envStore));
  }, []);

  return (
    <div className={styles['setting']}>
      {contextHolder}
      <Form
        form={form}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label='环境语言'
              name='language'
              rules={[
                { required: true, message: '语言为必填信息' }
              ]}
            >
              <LanguageSelect />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24} justify='end'>
          <Col span={24}>
            <div className={styles['operators']}>
              <Button type='primary' onClick={handleSave}>保存</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
});

EnvSetting.displayName = 'EnvSetting';

export default EnvSetting;
