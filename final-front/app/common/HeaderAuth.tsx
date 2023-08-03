'use client';

import { useAuthStore } from '@/store/auth';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import style from '@/styles/app/HeaderAuth.module.scss';
import { logout } from '@/utils/auth/data';
import { deletePhoto } from '@/utils/auth/photo';

export default function HeaderAuth() {
  const {
    photo,
    setData,
    dataStatus,
    setPhoto: storeSetPhoto,
  } = useAuthStore();

  const userphoto = photo ?? '/default-profile.png';
  const router = useRouter();
  const refLoginContent = useRef<HTMLDivElement>(null);

  const click$logout = async () => {
    // 이거 먼저 나와도 된다.
    // 이거 먼저 나오지 않으면 signOut이 될 동안 홈페이지로 가지 못한다.
    router.push('/');
    const { status, email, name } = logout();
    setData(status, email, name);
    deletePhoto(storeSetPhoto);
  };

  const pointerdown$photo = () => {
    if (refLoginContent.current) {
      refLoginContent.current.classList.toggle(style['visible']);
    }
  };

  const mouseenter$photo = () => {
    if (refLoginContent.current) {
      refLoginContent.current.classList.add(style['visible']);
    }
  };

  const mouseleave$container = () => {
    if (refLoginContent.current) {
      refLoginContent.current.classList.remove(style['visible']);
    }
  };

  const click$logincontent = () => {
    if (refLoginContent.current) {
      refLoginContent.current.classList.remove(style['visible']);
    }
  };

  if (dataStatus === 'failed') {
    return (
      <div className={style['container']} id="to-login">
        <div className={style['icon']}>
          <Link href={'/sign'}>
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </div>
      </div>
    );
  }

  if (dataStatus === 'fetched') {
    return (
      <div className={style['container']} onMouseLeave={mouseleave$container}>
        <button
          className={style['photo']}
          onPointerDown={pointerdown$photo}
          onMouseEnter={mouseenter$photo}
          id="to-profile"
        >
          <img
            src={userphoto}
            alt={'프로필 사진'}
            referrerPolicy={'no-referrer'}
          />
        </button>
        <div
          className={style['login-content']}
          ref={refLoginContent}
          onClick={click$logincontent}
        >
          <div className={style['logout-button']}>
            <button onClick={click$logout} id="log-out">
              로그아웃
            </button>
          </div>
          <div className={style['to-profile']}>
            <Link href={'/profile'}>프로필</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={style['container']}>
      <div className={style['skeleton']}></div>
    </div>
  );
}
