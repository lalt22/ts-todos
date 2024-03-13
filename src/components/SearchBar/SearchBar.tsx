import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import './SearchBar.scss';

export interface SearchBarProps {
  setSearchParam: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ setSearchParam }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setSearchParam(inputValue);
  }, [inputValue]);

  return (
    <input
      className='input-bar'
      type='text'
      onChange={handleInputChange}
      placeholder='Search By Description'
    />
  );
};

export default SearchBar;
