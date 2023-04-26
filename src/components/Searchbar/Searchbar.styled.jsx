import styled from 'styled-components';

export const SearchbarWrap = styled.header`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  background-color: ${p => p.theme.colors.accentDark};
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
`;

export const SearchBtn = styled.button`
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 0;
  opacity: 0.6;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  :hover {
    opacity: 1;
    scale: 1.1;
  }
`;

export const SearchInput = styled.input`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 8px;
  padding-right: 8px;
  &::placeholder {
    font: inherit;
    font-size: 16px;
    font-style: italic;
  }
`;

export const ListBtnDel = styled.button`
  width: 30px;
  padding: 3px;
  border-radius: 5px;
  border: none;
  background-color: ${p => p.theme.colors.accentLight};
  transition: all 0.2s ease-in-out;
  :hover,
  :focus {
    background-color: ${p => p.theme.colors.accentDark};
    color: #fff;
    box-shadow: -2px -2px 5px #fff,
      2px 2px 5px ${p => p.theme.colors.accentDark};
    svg {
      fill: #fff;
      stroke: #fff;
    }
  }
`;
