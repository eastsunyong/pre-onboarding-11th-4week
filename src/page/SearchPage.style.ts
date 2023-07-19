import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 40px;
`;

export const Input = styled.input`
  padding-left: 10px;
  width: 400px;
  height: 40px;
  margin-bottom: 10px;
  outline: none;
  border: 1px solid black;
  border-radius: 4px;
`;

export const SickBox = styled.div`
  height: 100%;
  width: 440px;
  box-shadow: 0px 2px 8px rgba(17, 24, 39, 0.25);
  background-color: #fff;
`;

export const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

export const Li = styled.li<{ isFocus?: boolean }>`
  width: 400px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 2px;
  background-color: ${(props) => (props.isFocus ? 'gray' : '#fff')};
  &:hover {
    background-color: gray;
    cursor: pointer;
  }
`;
