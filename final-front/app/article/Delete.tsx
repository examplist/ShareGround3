'use client';

import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteFile } from '@/utils/aws';
import style from '@/styles/article/Delete.module.scss';

interface Props {
  articleid: string;
  writer: string;
  filename: string;
}

export default function Delete({ articleid, writer, filename }: Props) {
  const [isWriter, setIsWriter] = useState<boolean>(false);
  const { name: username } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (username == writer) {
      setIsWriter(true);
    }
  }, []);

  const click$delete = async () => {
    const answer = confirm('삭제하시겠습니까?');
    if (!answer) {
      return;
    }

    // 파일 있으면 삭제하기
    if (filename) {
      const fileDeleted = await deleteFile(filename);
      if (!fileDeleted) {
        alert('죄송합니다. 기존의 파일을 삭제하는데 문제가 발생했습니다.');
        return;
      }
    }

    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + '/delete-article',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: articleid,
        }),
      }
    );
    const result = await response.text();
    if (result !== '성공') {
      alert('죄송합니다. 삭제되지 않았습니다.');
      return;
    }
    router.push('/article/deleted');
  };

  return (
    <>
      {isWriter && (
        <button
          onClick={click$delete}
          className={style['delete']}
          id="article__delete"
        >
          삭제
        </button>
      )}
    </>
  );
}
