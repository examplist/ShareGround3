'use client';

import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';
import Form from '@/app/edit/Form';
import style from '@/styles/write/page.module.scss';
import { Article } from '@/app/edit/Form';

export default function edit({ params }: { params: { id: string } }) {
  const { id } = params;
  const [article, setArticle] = useState<Article>(undefined);
  const { name } = useAuthStore();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/article/${id}`
      );
      const data = await response.json();
      if (!data.succeeded) {
        setArticle(null);
      } else {
        setArticle(data.dto);
      }
    })();
  }, []);

  if (article === undefined) {
    return (
      <main className={style['not-confirmed']}>글을 가져오고 있습니다.</main>
    );
  }

  if (article === null) {
    return (
      <main className={style['not-confirmed']}>
        해당 글이 존재하지 않습니다.
      </main>
    );
  }

  if (article.writer !== name) {
    return (
      <main className={style['not-confirmed']}>
        작성자만 수정할 수 있습니다.
      </main>
    );
  }

  return (
    <main className={style['confirmed']}>
      <Form data={article} />
    </main>
  );
}
