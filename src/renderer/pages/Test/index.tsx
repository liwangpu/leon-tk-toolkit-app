import { useState } from 'react';
import KeyWordTags from '../../components/KeyWordTags';
import styles from './index.module.scss';
import { observer } from 'mobx-react-lite';
import LanguageSelect from '../../components/LanguageSelect';
// import * as CountryLanguage from '@ladjs/country-language';

const TestPage: React.FC = observer((props) => {
  const [keywords, setKeywords] = useState('书包,电视');

  const handleChange = (val: string) => {
    console.log(`on change:`, val);
  };

  return (
    <div className={styles['page']}>
      {/* <LanguageSelect value='zh-hans'/> */}

      <KeyWordTags value={keywords} onChange={handleChange} />
    </div>
  );
});

TestPage.displayName = 'TestPage';

export default TestPage;
