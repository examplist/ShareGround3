'use client';

import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import style from '@/styles/article/ToEdit.module.scss';

export default function ToEdit({
  articleid,
  writer,
}: {
  articleid: string;
  writer: string;
}) {
  const [isWriter, setIsWriter] = useState<boolean>(false);
  const { name: username } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (username == writer) {
      setIsWriter(true);
    }
  }, []);

  const click$edit = () => {
    router.push(`/edit/${articleid}`);
  };

  return (
    <>
      {isWriter && (
        <button
          onClick={click$edit}
          className={style['to-edit']}
          id="article__to-edit"
        >
          수정
        </button>
      )}
    </>
  );
}
