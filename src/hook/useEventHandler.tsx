import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from './useDebounce';
import getData from '../api/clitent';

export const useEventHandler = () => {
  const [value, setValue] = useState<string>('');
  const [sickItem, setSickItem] = useState([]);
  const [index, setIndex] = useState<number>(-1);
  const autoRef = useRef<HTMLUListElement>(null);
  const { debounceValue } = useDebounce(value);
  const usekeyboardChange = (e: React.KeyboardEvent) => {
    if (sickItem.length > 0) {
      switch (e.key) {
        case 'ArrowDown':
          setIndex(index + 1);
          if (autoRef.current?.childElementCount === index + 1) {
            setIndex(0);
          }
          break;
        case 'ArrowUp':
          setIndex(index - 1);
          if (index <= 0) {
            setIndex(-1);
          }
          break;
        case 'Escape':
          setSickItem([]);
          setIndex(-1);
          break;
      }
    }
  };
  const onChangeData = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  useEffect(() => {
    if (!debounceValue) {
      setSickItem([]);
      setIndex(-1);
    } else {
      getData(debounceValue).then((res) => {
        setSickItem(res.slice(0, 10));
      });
    }
  }, [debounceValue]);

  return { value, setValue, sickItem, setSickItem, onChangeData, index, autoRef, usekeyboardChange };
};
