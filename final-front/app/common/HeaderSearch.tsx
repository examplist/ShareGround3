'use client';

import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import HeaderSearchNarrow from '@/app/common/HeaderSearchNarrow';
import HeaderSearchWide from '@/app/common/HeaderSearchWide';
import { searchTrimPathVariable } from '@/utils/search';

export type ChangeSearch = ChangeEventHandler<HTMLInputElement>;
export type ClickResult = MouseEventHandler<HTMLDivElement>;
export type Result = { id: string; title: string };

export default function HeaderSearch() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [result, setResult] = useState([]);

  const change$search: ChangeSearch = async (e) => {
    const {
      target: { value },
    } = e;
    const keyword = searchTrimPathVariable(value);
    setSearchValue(value);
    if (keyword === '') {
      return;
    }
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + `/search/${keyword}`
    );
    const data = await response.json();
    if (!data.succeeded) {
      alert('죄송합니다. 검색 결과를 가져오는 데 문제가 발생했습니다.');
      return;
    }
    const articles = data.dtos;
    setResult(articles);
  };

  const click$result: ClickResult = (e) => {
    setSearchValue('');
    setResult([]);
  };

  return (
    <>
      <HeaderSearchNarrow
        change$search={change$search}
        click$result={click$result}
        result={result}
        searchValue={searchValue}
      />
      <HeaderSearchWide
        change$search={change$search}
        click$result={click$result}
        result={result}
        searchValue={searchValue}
      />
    </>
  );
}
