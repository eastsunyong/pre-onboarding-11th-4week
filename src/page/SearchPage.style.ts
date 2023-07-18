import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 200px;
`;

export const Input = styled.input`
  padding-left: 10px;
  width: 400px;
  height: 40px;
  outline: none;
  border: 1px solid red;
  border-radius: 4px;
`;

export const SickBox = styled.div`
  height: 100%;
  width: 440px;
  background-color: #fff;
  top: 45px;
`;

export const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 30px;
  /* border: 1px solid red; */
`;

export const Li = styled.li<{ isFocus?: boolean }>`
  width: 400px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 2px;
  &:hover {
    background-color: gray;
    cursor: pointer;
  }
  background-color: ${(props) => (props.isFocus ? 'gray' : '#fff')};
`;
