import Delete from '@/app/article/Delete';
import ToEdit from '@/app/article/ToEdit';
import CommentForm from '@/app/article/CommentForm';
import Comments from '@/app/article/Comments';
import InterestButton from '@/app/article/InterestButton';
import { categoryEngToKor } from '@/utils/category-language';
import style from '@/styles/article/page.module.scss';

export default async function article({ params }: { params: { id: string } }) {
  const { id } = params;
  const response = await fetch(
    process.env.NEXT_PUBLIC_BACKEND + `/article/${id}`,
    {
      cache: 'no-store',
    }
  );
  const data = await response.json();

  if (!data.succeeded) {
    return <main className={style['no-content']}>{data.errorMessage}</main>;
  }

  const { category, title, content, time, filename, fileurl, writer } =
    data.dto;

  return (
    <main className={style['content']}>
      <section className={style['section']}>
        <div id="article__category">카테고리: {categoryEngToKor(category)}</div>
        <div id="article__date">작성일: {time}</div>
        <div id="article__writer">작성자: {writer ? writer : '(탈퇴했음)'}</div>
      </section>
      <h1 className={style['title']} id="article__title">
        {title}
      </h1>
      <hr />
      <p className={style['explanation']} id="article__explanation">
        {content}
      </p>
      {fileurl && (
        <div className={style['file']} id="article__file">
          <a href={fileurl}>파일 다운로드</a>
        </div>
      )}
      <div className={style['edit-delete']}>
        <ToEdit articleid={id} writer={writer} />
        <Delete articleid={id} writer={writer} filename={filename} />
      </div>
      <InterestButton articleid={id} writer={writer} />
      <h2 className={style['comment-title']} id="article__comment-title">
        댓글
      </h2>
      <CommentForm articleid={id} />
      <Comments articleid={id} />
    </main>
  );
}
