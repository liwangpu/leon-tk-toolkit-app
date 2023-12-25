import React, { memo, useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { TweenOneGroup } from 'rc-tween-one';
import type { InputRef } from 'antd';
import { Input, Tag, theme } from 'antd';
import styles from './index.module.scss';

export interface IKeyWordTagsProps {
  value?: Array<string>;
  onChange?(val: Array<string>): void;
}

export const KeyWordTags: React.FC<IKeyWordTagsProps> = memo((props) => {
  const { value, onChange } = props;

  const { token } = theme.useToken();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag: string) => {
    const newTags = value.filter((tag) => tag !== removedTag);
    onChange(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && value.indexOf(inputValue) === -1) {
      onChange([...value, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const forMap = (tag: string) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }} data-dd={'1'}>
        {tagElem}
      </span>
    );
  };

  const tagChild = value.map(forMap);

  const tagPlusStyle: React.CSSProperties = {
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  };

  return (
    <>
      {!!value?.length && (
        <div className={styles['keyword-input-container']}>
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: 'from',
              duration: 100,
            }}
            onEnd={(e) => {
              if (e.type === 'appear' || e.type === 'enter') {
                (e.target as any).style = 'display: inline-block';
              }
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {tagChild}
          </TweenOneGroup>
        </div>
      )}
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag onClick={showInput} style={tagPlusStyle}>
          <PlusOutlined /> 新关键词
        </Tag>
      )}
    </>
  );
});

KeyWordTags.displayName = 'KeyWordTags';

export interface IKeyWordTextTagsProps {
  value?: string;
  onChange?(val: string): void;
}

export const KeyWordTextTags: React.FC<IKeyWordTextTagsProps> = memo(
  (props) => {
    const { value: _value, onChange: _onChange } = props;
    const value = _value ? _value.split(',') : [];
    const onChange = (val: Array<string>) => {
      _onChange(val?.length ? val.join(',') : null);
    };
    return <KeyWordTags value={value} onChange={onChange} />;
  },
);

KeyWordTextTags.displayName = 'KeyWordTextTags';
