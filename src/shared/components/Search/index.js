import React from 'react';
import styled from 'styled-components';

function Search({ search, onSearch }) {
  /* onSearch computes search */
  return (
    <SearchContainer>
      <SearchIcon src="/search.png" alt="search icon" />
      <SearchInput
        type="text"
        onChange={(e) => onSearch(e)}
        value={search}
        placeholder="search"
      />
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;

const SearchIcon = styled.img`
  width: 12px;
  height: 12px;
  transform: translate(17px, 5px);
`;

const SearchInput = styled.input`
  border-radius: 20px;
  border-color: black;
  padding-left: 20px;
`;

export default Search;
