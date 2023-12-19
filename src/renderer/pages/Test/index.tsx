import styles from './index.module.scss';
import { observer } from 'mobx-react-lite';
import LanguageSelect from '../../components/LanguageSelect';
// import * as CountryLanguage from '@ladjs/country-language';


const TestPage: React.FC = observer(props => {


  return (
    <div className={styles['page']}>
      <LanguageSelect value='zh-hans'/>
    </div>
  );
});

TestPage.displayName = 'TestPage';

export default TestPage;
