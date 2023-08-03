'use client';

import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { LoadStatus } from '@/app/profile/Account';
import style from '@/styles/profile/AccountDelete.module.scss';
import { logout } from '@/utils/auth/data';
import { deletePhoto } from '@/utils/auth/photo';

export default function AccountDelete({
  loadStatus,
}: {
  loadStatus: LoadStatus;
}) {
  const { loading, setLoading } = loadStatus;
  const router = useRouter();
  const {
    email: storeEmail,
    photo,
    setData,
    dataStatus,
    setPhoto: storeSetPhoto,
  } = useAuthStore();

  const click$delete = async () => {
    const answer = confirm('정말로 탈퇴하시겠습니까? 관심 목록도 사라집니다.');
    if (!answer) {
      return;
    }
    if (!storeEmail) {
      alert('현재 사용자가 없습니다.');
      return;
    }
    setLoading(true);

    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + '/delete-account',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: storeEmail,
        }),
      }
    );

    const result = await response.text();
    if (result !== '성공') {
      alert(result);
      setLoading(false);
    }
    const { status, email: utilEmail, name } = logout();
    setData(status, utilEmail, name);
    deletePhoto(storeSetPhoto);
    // 홈페이지로
    router.push('/');
  };

  return (
    <section className={style['section']}>
      <button
        onClick={click$delete}
        disabled={loading}
        className={style['button']}
        id="delete-account-button"
      >
        탈퇴
      </button>
    </section>
  );
}
