import React from 'react';
import styled from 'styled-components';
import SearchPage from './page/SearchPage';
import Header from './components/Header';

const App = () => {
  return (
    <Screen>
      <Header />
      <SearchPage />
    </Screen>
  );
};

const Screen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: skyblue;
`;

export default App;
