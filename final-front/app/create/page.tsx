'use client';

import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';
import Form from '@/app/create/Form';
import style from '@/styles/write/page.module.scss';

export default function profile() {
  const { dataStatus, email: storeEmail } = useAuthStore();
  const [status, setStatus] = useState<string | null>();
  const [email, setEmail] = useState<string | null>();

  useEffect(() => {
    setStatus(dataStatus);
    setEmail(storeEmail);
  }, []);

  if (status === 'failed' || !email) {
    return (
      <main className={style['not-confirmed']} id="cannot-create">
        로그인을 하셔서 원하는 글을 작성해 보세요!
      </main>
    );
  }

  if (status === 'fetched') {
    return (
      <main className={style['confirmed']}>
        <Form writer={email} />
      </main>
    );
  }

  return <main className={style['not-confirmed']}>로딩 중</main>;
}
