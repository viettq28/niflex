import { useState } from 'react';

import classes from './SearchForm.module.css';
import Button from '../UI/Button';
import { SearchIcon } from '../Navbar/Navbar';

const SearchForm = ({submitSearchTerm}) => {
  const [value, setValue] = useState('');
  // handleChange lấy dữ liệu từ Input
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  // handleSubmit setSearchTerm bằng input value
  const handleSubmit = (e) => {
    e.preventDefault();
    submitSearchTerm(value);
    setValue('');
  };
  // Reset Input
  const handleReset = (e) => {
    setValue('');
  }

  return (
    <form className={classes['form']} onSubmit={handleSubmit}>
      <div className={classes['search-field']}>
        <input id='search-field' onChange={handleChange} value={value}></input>
        <label htmlFor='search-field'><SearchIcon /></label>
      </div>
      <div className={classes['button-field']}>
        <Button type="reset" handleClick={handleReset}>RESET</Button>
        <Button type="submit" isDisabled={!value}>SEARCH</Button>
      </div>
    </form>
  );
};

export default SearchForm;
