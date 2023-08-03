'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from '@/utils/aws';
import style from '@/styles/write/Form.module.scss';

export default function Form({ writer }: { writer: string }) {
  const id = uuidv4();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const refSubmit = useRef<HTMLInputElement>(null);
  const refFile = useRef<HTMLInputElement>(null);
  const [showFileName, setShowFileName] = useState<string>('');

  const click$cancel = () => {
    router.push('/');
  };
  const click$submit = () => {
    refSubmit.current?.click();
  };
  const click$file = () => {
    refFile.current?.click();
  };
  const change$file = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    // 업로드를 취소한 경우
    if (!event.target.files[0]) {
      setShowFileName('');
      return;
    }
    setShowFileName(event.target.files[0].name);
  };

  const submit$form: SubmitHandler<FieldValues> = async ({
    category,
    title,
    content,
  }) => {
    if (category === '') {
      alert('카테고리를 선택하셔야 합니다!');
      return;
    }
    if (title === '') {
      alert('제목을 입력하셔야 합니다!');
      return;
    }

    setLoading(true);

    // 파일 관련
    let filetype = null;
    let filename = null;
    let fileurl = null;
    if (refFile.current?.files) {
      if (refFile.current.files[0]) {
        const file = refFile.current.files[0];
        filetype = file.name.split('.').at(-1);
        filename = uuidv4() + '.' + filetype;
        const fileUploaded = await uploadFile(file, filename);
        if (!fileUploaded) {
          alert('죄송합니다. 파일 업로드에 문제가 발생했습니다.');
          setLoading(false);
          return;
        }
        fileurl = `https://bada-learning-1.s3.ap-northeast-2.amazonaws.com/kdt-final/${filename}`;
      }
    }

    // 요청하기
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + `/create-article`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          category,
          title,
          content,
          filename,
          filetype,
          fileurl,
          writer,
        }),
      }
    );

    const data = await response.json();

    if (!data.succeeded) {
      alert(data.errorMessage);
      setLoading(false);
      return;
    }

    router.push(`/article/${id}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit$form)}>
        <section className={style['select']}>
          <label htmlFor="create__category">카테고리:</label>
          <select id="create__category" {...register('category')}>
            <option value="">선택하세요.</option>
            <option value="society">사회</option>
            <option value="science">과학기술</option>
            <option value="culture">문화</option>
          </select>
        </section>
        <input
          type={'text'}
          {...register('title')}
          placeholder={'제목을 입력하세요.'}
          className={style['title']}
          id="create__title"
        />
        <textarea
          {...register('content')}
          placeholder={'설명을 입력하세요.'}
          className={style['content']}
          id="create__content"
        ></textarea>
        <input type={'submit'} hidden ref={refSubmit} />
      </form>
      <section className={style['file']}>
        <input
          type={'file'}
          hidden
          onChange={change$file}
          ref={refFile}
          id="create__file"
        />
        <button onClick={click$file} disabled={loading}>
          파일 업로드
        </button>
        <div>업로드된 파일: {showFileName}</div>
      </section>
      <section className={style['buttons']}>
        <button onClick={click$cancel} disabled={loading}>
          취소
        </button>
        <button onClick={click$submit} disabled={loading} id="create__submit">
          제출
        </button>
      </section>
    </>
  );
}
