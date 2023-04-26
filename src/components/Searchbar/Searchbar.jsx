import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import {
  SearchbarWrap,
  SearchForm,
  SearchBtn,
  SearchInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  return (
    <SearchbarWrap>
      <SearchForm>
        <SearchBtn type="submit">
          <BiSearch size="24" />
        </SearchBtn>

        <SearchInput
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarWrap>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
