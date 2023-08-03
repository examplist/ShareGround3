'use client';

import { useRef, forwardRef, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ChangeSearch, ClickResult, Result } from '@/app/common/HeaderSearch';
import style from '@/styles/app/HeaderSearchNarrow.module.scss';

interface Props {
  change$search: ChangeSearch;
  click$result: ClickResult;
  result: Result[];
  searchValue: string;
}
type ResultCompRefs = HTMLDivElement;
interface ResultCompProps {
  result: Result[];
  click$result: ClickResult;
  elementSearch: HTMLInputElement | null;
}

const ResultComp = forwardRef<ResultCompRefs, ResultCompProps>(
  (props, reference) => {
    const { click$result: click$resultFromProp, result, elementSearch } = props;
    const click$result: ClickResult = (e) => {
      click$resultFromProp(e);
      if (elementSearch) {
        elementSearch.classList.remove(style['visible']);
      }
    };

    return (
      <div
        className={`${style['result']} ${style['visible']}`}
        ref={reference}
        onClick={click$result}
        id="search-narrow__result"
      >
        {result.map(({ title, id }, index) => (
          <div key={index}>
            <Link href={`/article/${id}`}>{title}</Link>
          </div>
        ))}
      </div>
    );
  }
);

export default function HeaderSearchNarrow({
  result,
  change$search,
  click$result,
  searchValue,
}: Props) {
  const refSearch = useRef<HTMLInputElement>(null);
  const refResultContainer = useRef<HTMLDivElement>(null);

  const click$button = () => {
    refSearch.current?.classList.toggle(style['visible']);
    refResultContainer.current?.classList.toggle(style['visible']);
  };

  useEffect(() => {
    window.addEventListener('pointerup', (e) => {
      // container도 여기서 처리하면 링크 이동이 안 됨

      // closest를 적용하기 위해서 다음과 같이 함
      const { target } = e;
      if (!(target instanceof Element)) {
        return;
      }
      // container가 평소에는 null이기 때문에
      // 평소에도 target.closest와 refResultContainer가 둘 다 null이므로 같음
      // 따라서 null이 아니라는 조건 추가
      if (
        target.closest('#search-narrow__result') ===
          refResultContainer.current &&
        refResultContainer.current !== null
      ) {
        return;
      }
      if (target !== refSearch.current) {
        refSearch.current?.classList.remove(style['visible']);
        refResultContainer.current?.classList.remove(style['visible']);
      }
    });
  }, []);

  // 큰 화면에서 검색하다가 작은 화면으로 옮길 시, 그대로 검색창이 보이도록 하게
  // 결과 화면은 원래부터 보였다.
  useEffect(() => {
    if (searchValue !== '') {
      refSearch.current?.classList.add(style['visible']);
    }
  }, [searchValue]);

  return (
    <div className={style['container']} id="search-narrow__container">
      <button
        className={style['button']}
        onClick={click$button}
        id="search-narrow__button"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      <input
        type={'text'}
        className={style['search']}
        placeholder={'원하시는 콘텐츠의 제목을 입력하세요.'}
        onChange={change$search}
        value={searchValue}
        ref={refSearch}
        id="search-narrow__input"
      />
      {searchValue === '' ? (
        <></>
      ) : (
        <ResultComp
          result={result}
          click$result={click$result}
          ref={refResultContainer}
          elementSearch={refSearch.current}
        />
      )}
    </div>
  );
}
