'use client';

import { useRouter } from 'next/navigation';
import { extAud, extDoc, extImg, extVid } from '@/utils/file-ext';
import { categoryEngToKor } from '@/utils/category-language';
import style from '@/styles/app/Card.module.scss';

export interface Datum {
  id: string;
  category: string;
  title: string;
  time: string;
  filetype: string;
}

export default function Card({ datum }: { datum: Datum }) {
  const { id, category, title, time, filetype } = datum;
  const router = useRouter();

  let fileTypeForBorder = 'default';

  if (extAud.includes(filetype)) {
    fileTypeForBorder = 'aud';
  }
  if (extDoc.includes(filetype)) {
    fileTypeForBorder = 'doc';
  }
  if (extImg.includes(filetype)) {
    fileTypeForBorder = 'img';
  }
  if (extVid.includes(filetype)) {
    fileTypeForBorder = 'vid';
  }

  const click$article = () => {
    router.push(`/article/${id}`);
  };

  return (
    <article
      className={`${style['card']} ${style[fileTypeForBorder]}`}
      onClick={click$article}
      id="article-card"
    >
      <div className={style['file-type']}>{filetype ?? '파일 없음'}</div>
      <div className={style['title']} id="article-card__title">
        {title}
      </div>
      <div className={style['others']} id="article-card__others">
        {categoryEngToKor(category)}, {time}
      </div>
    </article>
  );
}
