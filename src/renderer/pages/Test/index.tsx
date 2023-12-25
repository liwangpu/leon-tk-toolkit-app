import { useState } from 'react';
import { KeyWordTags, KeyWordTextTags } from '../../components/KeyWordTags';
import styles from './index.module.scss';
import { observer } from 'mobx-react-lite';
import LanguageSelect from '../../components/LanguageSelect';
// import * as CountryLanguage from '@ladjs/country-language';

const arr = [
  'xxxxxxxxxxxxxxxxxxxxxxxxxx',
  'aaaaaaaaaaaaaaaaaaaaaaaaaa',
  'bbbbbbbbbbbbbbbbbbbbbbbbbbb',
  'ccccccccccccccccccccccccccc',
  'ddddddddddddddddddddddddddd',
];

const TestPage: React.FC = observer((props) => {
  const [keywords, setKeywords] = useState<Array<string>>(arr);
  const [textKeywords, setTextKeywords] = useState<string>(arr.join(','));

  // const handleChange = (val: Array<string>) => {
  //   console.log(`on change:`, val);
  //   setKeywords(val);
  // };

  return (
    <div className={styles['page']}>
      {/* <LanguageSelect value='zh-hans'/> */}

      <KeyWordTags value={keywords} onChange={setKeywords} />

      {/* <KeyWordTextTags value={textKeywords} onChange={setTextKeywords} /> */}
    </div>
  );
});

TestPage.displayName = 'TestPage';

export default TestPage;
