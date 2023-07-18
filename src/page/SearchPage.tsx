import { ISickData } from '../interfaces';
import { useEventHandler } from '../hook/useEventHandler';
import * as S from './SearchPage.style';
import NoSearch from '../components/NoSearch';

const SearchPage = () => {
  const { value, setValue, sickItem, onChangeData, index, autoRef, usekeyboardChange } = useEventHandler();
  return (
    <S.Container>
      <S.Input
        placeholder="질환명을 입력해주세요"
        value={value}
        onChange={onChangeData}
        onKeyDown={usekeyboardChange}
      />
      {sickItem.length > 0 && value !== '' ? (
        <S.SickBox>
          <S.Ul ref={autoRef}>
            {sickItem.map((search: ISickData, idx: number) => (
              <S.Li
                isFocus={index === idx ? true : false}
                key={search.sickNm}
                onClick={() => {
                  setValue(search.sickNm);
                }}
              >
                <p>{search.sickNm}</p>
              </S.Li>
            ))}
          </S.Ul>
        </S.SickBox>
      ) : (
        <NoSearch />
      )}
    </S.Container>
  );
};

export default SearchPage;
