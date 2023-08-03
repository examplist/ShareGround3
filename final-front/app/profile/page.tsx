'use client';

import Account from '@/app/profile/Account';
import InterestList from '@/app/profile/InterestList';
import Wrote from '@/app/profile/Wrote';
import { useAuthStore } from '@/store/auth';
import style from '@/styles/profile/page.module.scss';
import { useEffect, useState } from 'react';

function Exist() {
  const [category, setCategory] = useState<string>('account');

  function isChosen(thisCategory: string) {
    if (thisCategory === category) {
      return 'chosen';
    } else {
      return '';
    }
  }

  return (
    <main className={style['exist']}>
      <section className={style['choose']}>
        <button
          onClick={() => setCategory('account')}
          className={style[isChosen('account')]}
          id="profile-button__account"
        >
          계정
        </button>
        <button
          onClick={() => setCategory('wrote')}
          className={style[isChosen('wrote')]}
          id="profile-button__wrote"
        >
          작성
        </button>
        <button
          onClick={() => setCategory('interest')}
          className={style[isChosen('interest')]}
          id="profile-button__interest"
        >
          관심
        </button>
      </section>
      {category === 'account' && <Account />}
      {category === 'wrote' && <Wrote />}
      {category === 'interest' && <InterestList />}
    </main>
  );
}

export default function profile() {
  const [status, setStatus] = useState<string | null>();

  const { dataStatus } = useAuthStore();

  useEffect(() => {
    setStatus(dataStatus);
  }, []);

  if (status === 'failed') {
    return (
      <main className={style['not-exist']}>
        프로필 페이지입니다. 로그인을 하셔야 사용하실 수 있습니다.
      </main>
    );
  }

  if (status === 'fetched') {
    return <Exist />;
  }

  return <main className={style['not-exist']}>로딩 중</main>;
}
