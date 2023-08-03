import { useState } from 'react';
import AccountName from '@/app/profile/AccountName';
import AccountPhoto from '@/app/profile/AccountPhoto';
import AccountDelete from '@/app/profile/AccountDelete';
import style from '@/styles/profile/Account.module.scss';

export interface LoadStatus {
  loading: boolean;
  setLoading: (status: boolean) => void;
}

export default function Account() {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <section className={style['section']}>
      <AccountPhoto loadStatus={{ loading, setLoading }} />
      <AccountName loadStatus={{ loading, setLoading }} />
      <AccountDelete loadStatus={{ loading, setLoading }} />
    </section>
  );
}
