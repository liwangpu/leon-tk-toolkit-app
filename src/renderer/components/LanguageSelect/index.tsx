import { memo } from 'react';
import { Select } from 'antd';
import { LANGUAGE_CODES } from '../../../consts';
import { translateLanguageCodeToDisplayName } from '../../utils';

let regionNames = new Intl.DisplayNames(['zh'], { type: 'language' });

const OPTIONS1 = LANGUAGE_CODES.map(c => ({ value: c, label: translateLanguageCodeToDisplayName(c) }));

const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

export interface ILanguageSelectProps {
  value?: string;

  onChange?(val: string): void;
}

const LanguageSelect: React.FC<ILanguageSelectProps> = memo(props => {

  const { value, onChange } = props;

  return (
    <Select
      // mode="multiple"
      showSearch
      placeholder='请选值语言'
      value={value}
      onChange={onChange}
      optionFilterProp='children'
      style={{ width: '100%' }}
      filterOption={filterOption}
      options={OPTIONS1}
    />
  );
});

LanguageSelect.displayName = 'LanguageSelect';

export default LanguageSelect;
