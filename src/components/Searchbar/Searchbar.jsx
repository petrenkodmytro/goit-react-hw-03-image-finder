import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import {
  SearchbarWrap,
  SearchBtn,
  Form,
  FieldInput,
  ErrorMessage,
} from './Searchbar.styled';
import { Formik } from 'formik';
import * as Yup from 'yup';

// валідація форми
const SearchSchema = Yup.object().shape({
  query: Yup.string().required('Please enter something for seach.'),
});

export const Searchbar = ({ onSubmit }) => {
  return (
    <SearchbarWrap>
      <Formik
        initialValues={{ query: '' }}
        validationSchema={SearchSchema}
        onSubmit={(values, actions) => {
          onSubmit({ ...values });
          actions.resetForm();
        }}
      >
        <Form>
          <SearchBtn type="submit">
            <BiSearch size="24" />
          </SearchBtn>

          <FieldInput
            type="text"
            name="query"
            placeholder="Search images and photos"
          />
          <ErrorMessage name="query" component="div" />
        </Form>
      </Formik>
    </SearchbarWrap>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
