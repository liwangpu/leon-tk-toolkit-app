import { Col, Form, Input, Row } from 'antd';
import type { FormInstance } from 'antd/es/form/hooks/useForm';
import { observer } from 'mobx-react-lite';
import { KeyWordTextTags } from '../../../components/KeyWordTags';
import styles from './index.module.scss';
import LanguageSelect from '../../../components/LanguageSelect';

export interface IEditorPanelProps {
  form: FormInstance;
}

const EditPanel: React.FC<IEditorPanelProps> = observer(props => {

  const { form } = props;

  return (
    <div className={styles['panel']}>
      <div className={styles['panel__content']}>
        <Form
          form={form}
        >
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                name='id'
                hidden
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='账号'
                name='account'
                rules={[
                  { required: true, message: '账号为必填信息' },
                ]}
              >
                <Input placeholder='请输入账号' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label='密码'
                name='password'
                rules={[
                  { required: true, message: '密码为必填信息' },
                ]}
              >
                <Input placeholder='请输入密码' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label='语言'
                name='language'
                rules={[
                  { required: true, message: '语言为必填信息' },
                ]}
              >
                <LanguageSelect />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label='关键词'
                name='keywords'
              >
                <KeyWordTextTags />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className={styles['panel__footer']} />
    </div>
  );
});

EditPanel.displayName = 'EditPanel';

export default EditPanel;
