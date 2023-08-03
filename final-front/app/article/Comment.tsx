'use client';

import { useState } from 'react';
import style from '@/styles/article/Comment.module.scss';

interface Props {
  id: string | null;
  content: string;
  time: string;
  writername: string;
  writerphoto: string;
  currentUser: string | null;
}

export default function Comment({
  id,
  content,
  time,
  writername,
  writerphoto,
  currentUser,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const click$delete = async () => {
    const answer = confirm('해당 댓글을 삭제하시겠습니까?');
    if (!answer) {
      return;
    }
    setLoading(true);
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + `/comments-delete/${id}`,
      {
        method: 'POST',
      }
    );
    const result = await response.text();
    if (result === '실패') {
      alert('삭제가 되지 않았습니다!');
      setLoading(false);
      return;
    }
    location.reload();
  };

  return (
    <article className={style['comment']} id="comment__whole">
      <div className={style['meta']}>
        <div className={style['writer-photo']}>
          <img src={writerphoto} />
        </div>
        <div className={style['writer-name']} id="comment__writer">
          {writername}
        </div>
        <div>{time}</div>
      </div>
      <div id="comment__content">{content}</div>
      {writername === currentUser && (
        <div className={style['delete']}>
          <button
            onClick={click$delete}
            disabled={loading}
            id="comment__delete"
          >
            삭제
          </button>
        </div>
      )}
    </article>
  );
}
