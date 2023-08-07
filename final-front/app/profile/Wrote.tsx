'use client';

import { useAuthStore } from '@/store/auth';
import { useEffect, useState, useRef } from 'react';
import Card from '@/app/common/Card';
import Loader from '@/app/profile/Loader';
import { Datum } from '@/app/common/Card';
import style from '@/styles/profile/Wrote.module.scss';

export default function Wrote() {
  let currentPage = 1;
  const [data, setData] = useState<Datum[]>([]);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const refLoader = useRef<HTMLDivElement>(null);
  const { email } = useAuthStore();

  const fetchData = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(async (entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND + `/wrotelist/${email}/${currentPage}`,
        {
          cache: 'no-store',
        }
      );
      const data = await response.json();
      if (!data.succeeded) {
        return;
      }
      const { dtos, pageCount } = data;
      setData((data) => [...data, ...dtos]);
      if (currentPage === pageCount || pageCount === 0) {
        setIsEnd(true);
      } else {
        currentPage++;
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(fetchData, {
      threshold: 0,
    });

    if (refLoader.current) {
      observer.observe(refLoader.current);
    }
  }, []);

  return (
    <section className={style['list']}>
      {data.map((datum, index) => {
        return <Card datum={datum} key={index} />;
      })}
      {!isEnd ? (
        <Loader ref={refLoader} />
      ) : (
        <div className={style['end-message']}>모든 자료가 다 왔습니다.</div>
      )}
    </section>
  );
}
