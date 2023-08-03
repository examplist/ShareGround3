'use client';

import { useAuthStore } from '@/store/auth';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import style from '@/styles/sign/Form.module.scss';
import { login } from '@/utils/auth/data';
import { setGetPhoto } from '@/utils/auth/photo';

export default function Form() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const { setData, setPhoto: storeSetPhoto } = useAuthStore();

  // 로그인
  const click$login = async () => {
    const emailInput = refEmail.current?.value;
    const passwordInput = refPassword.current?.value;
    if (!emailInput || !passwordInput) {
      alert('이메일과 비밀번호를 입력하셔야 합니다.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailInput,
          pw: passwordInput,
        }),
      });
      const data = await response.json();
      if (!data.succeeded) {
        alert(data.errorMessage);
        setLoading(false);
      } else {
        const { status, email, name } = login(data.email, data.name);
        setData(status, email, name);
        setGetPhoto(data.photo, storeSetPhoto);
        router.push('/');
      }
    } catch (error) {
      console.error(error);
      alert('죄송합니다. 문제가 발생했습니다.');
      setLoading(false);
    }
  };

  // 회원가입
  const click$signup = async () => {
    const emailInput = refEmail.current?.value;
    const passwordInput = refPassword.current?.value;
    if (!emailInput || !passwordInput) {
      alert('아이디와 비밀번호를 입력하셔야 합니다.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND + '/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailInput,
            pw: passwordInput,
          }),
        }
      );
      const data = await response.json();
      if (!data.succeeded) {
        alert(data.errorMessage);
        setLoading(false);
      } else {
        const { status, email, name } = login(data.email, data.name);
        setData(status, email, name);
        setGetPhoto(data.photo, storeSetPhoto);
        router.push('/');
      }
    } catch (error) {
      console.error(error);
      alert('죄송합니다. 문제가 발생했습니다.');
      setLoading(false);
    }
  };

  return (
    <section className={style['not-logged-in']} id="sign-form">
      <label htmlFor="email" className={style['label']}>
        이메일
      </label>
      <input
        type={'email'}
        id="email"
        ref={refEmail}
        className={style['input']}
      />
      <label htmlFor="password" className={style['label']}>
        비밀번호
      </label>
      <input
        type={'password'}
        id="password"
        ref={refPassword}
        className={style['input']}
      />
      <div className={style['buttons']}>
        <button
          onClick={click$login}
          disabled={loading}
          className={style['log-in']}
          id="log-in"
        >
          로그인
        </button>
        <button
          onClick={click$signup}
          disabled={loading}
          className={style['sign-up']}
          id="sign-up-button"
        >
          회원가입
        </button>
      </div>
    </section>
  );
}
