'use client';

import { useAuthStore } from '@/store/auth';
import { useRef } from 'react';
import { LoadStatus } from '@/app/profile/Account';
import style from '@/styles/profile/AccountName.module.scss';
import { changeUsername } from '@/utils/auth/data';

export default function AccountName({
  loadStatus,
}: {
  loadStatus: LoadStatus;
}) {
  const { loading, setLoading } = loadStatus;
  const { name, email, setName } = useAuthStore();
  const refNameSection = useRef<HTMLElement>(null);
  const refInputName = useRef<HTMLInputElement>(null);

  const click$edit = () => {
    refNameSection.current?.classList.add(style['edit-mode']);
  };
  const click$cancel = () => {
    const $inputName = refInputName.current;
    const $nameSection = refNameSection.current;
    if (!$inputName || !$nameSection) {
      return;
    }
    if (!email || !name) {
      return;
    }
    $inputName.value = name;
    $nameSection.classList.remove(style['edit-mode']);
  };
  const click$confirm = async () => {
    const $inputName = refInputName.current;
    if (!$inputName) {
      return;
    }
    if ($inputName.value.length === 0) {
      alert('이름은 한 글자 이상이어야 합니다.');
      return;
    }
    if (!email || !name) {
      return;
    }
    setLoading(true);
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + '/change-username',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name: $inputName.value }),
      }
    );
    const result = await response.text();
    if (result !== '성공') {
      alert(result);
      setLoading(false);
      return;
    }
    changeUsername($inputName.value);
    setName($inputName.value);
    refNameSection.current?.classList.remove(style['edit-mode']);
    setLoading(false);
  };

  return (
    <section className={style['section']} ref={refNameSection}>
      <div className={style['text']} id="profile-name">
        {name}
      </div>
      <button
        className={`${style['edit']} ${style['button']}`}
        onClick={click$edit}
        disabled={loading}
        id="profile-name__to-edit"
      >
        수정
      </button>
      <input
        type={'text'}
        className={style['input']}
        ref={refInputName}
        defaultValue={name ? name : ''}
        id="profile-name__edit-input"
      />
      <button
        className={`${style['cancel']} ${style['button']}`}
        onClick={click$cancel}
        disabled={loading}
      >
        취소
      </button>
      <button
        className={`${style['confirm']} ${style['button']}`}
        onClick={click$confirm}
        disabled={loading}
        id="profile-name__edit-confirm"
      >
        확인
      </button>
    </section>
  );
}
