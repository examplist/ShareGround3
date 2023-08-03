'use client';

import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';
import Form from '@/app/sign/Form';
import style from '@/styles/sign/page.module.scss';

export default function sign() {
  const { dataStatus } = useAuthStore();
  const [status, setStatus] = useState<string | null>();

  useEffect(() => {
    setStatus(dataStatus);
  }, []);

  if (status === 'fetched') {
    return (
      <main className={style['main']}>
        <section className={style['logged-in']}>
          이미 로그인을 하셨습니다.
        </section>
      </main>
    );
  }

  if (status === 'failed') {
    return (
      <main className={style['main']}>
        <Form />
      </main>
    );
  }

  return <main className={style['main']}>로딩 중</main>;
}
