import { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { deleteFile, uploadFile } from '@/utils/aws';
import style from '@/styles/write/Form.module.scss';

export type Article =
  | {
      id: string;
      category: string;
      title: string;
      content: string;
      filename: string;
      writer: string;
    }
  | null
  | undefined;

interface Props {
  data: Article;
}

export default function Form({ data }: Props) {
  if (!data) {
    return <></>;
  }

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const { category, title, content, filename: oldFilename } = data;
  const [showFileName, setShowFileName] =
    useState<string>('파일을 새로 올리셔야 합니다.');
  const refFile = useRef<HTMLInputElement>(null);
  const refSubmit = useRef<HTMLInputElement>(null);

  const click$cancel = () => {
    router.push(`/article/${data.id}`);
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

  const submit$edit: SubmitHandler<FieldValues> = async ({
    category,
    title,
    content,
  }) => {
    if (title === '') {
      alert('제목을 입력하셔야 합니다!');
      return;
    }

    setLoading(true);

    // 기존에 파일이 있다면 삭제
    if (oldFilename) {
      const fileDeleted = await deleteFile(oldFilename);
      if (!fileDeleted) {
        alert('죄송합니다. 기존의 파일을 삭제하는데 문제가 발생했습니다.');
        setLoading(false);
        return;
      }
    }

    // 파일 관련
    let newFiletype = null;
    let newFilename = null;
    let newFileurl = null;
    if (refFile.current?.files) {
      if (refFile.current.files[0]) {
        const file = refFile.current.files[0];
        newFiletype = file.name.split('.').at(-1);
        newFilename = uuidv4() + '.' + newFiletype;
        const fileUploaded = await uploadFile(file, newFilename);
        if (!fileUploaded) {
          alert('죄송합니다. 파일 업로드에 문제가 발생했습니다.');
          setLoading(false);
          return;
        }
        newFileurl = `https://bada-learning-1.s3.ap-northeast-2.amazonaws.com/kdt-final/${newFilename}`;
      }
    }

    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + '/update-article',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: data.id,
          category,
          title,
          content,
          filename: newFilename,
          filetype: newFiletype,
          fileurl: newFileurl,
        }),
      }
    );
    const { succeeded, errorMessage, dto } = await response.json();
    if (!succeeded) {
      alert(errorMessage);
      setLoading(false);
      return;
    }
    // 캐싱이 자꾸 되어서 location 사용함
    // router.push(`/article/${data.id}`);
    location.href = `/article/${data.id}`;
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit$edit)}>
        <section className={style['select']}>
          <label htmlFor="edit__category">카테고리</label>
          <select
            {...register('category')}
            defaultValue={category}
            id="edit__category"
          >
            <option value="society">사회</option>
            <option value="science">과학기술</option>
            <option value="culture">문화</option>
          </select>
        </section>
        <input
          type={'text'}
          {...register('title')}
          defaultValue={title}
          className={style['title']}
          id="edit__title"
        />
        <textarea
          {...register('content')}
          defaultValue={content}
          className={style['content']}
          id="edit__explanation"
        ></textarea>
        <input type={'submit'} hidden ref={refSubmit} />
      </form>
      <section className={style['file']}>
        <input
          type={'file'}
          hidden
          onChange={change$file}
          ref={refFile}
          id="edit__file"
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
        <button onClick={click$submit} disabled={loading} id="edit__submit">
          수정
        </button>
      </section>
    </>
  );
}
