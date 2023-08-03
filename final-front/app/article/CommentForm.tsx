'use client';

import { useAuthStore } from '@/store/auth';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import style from '@/styles/article/CommentForm.module.scss';

export default function CommentForm({ articleid }: { articleid: string }) {
  const { email } = useAuthStore();
  const { register, handleSubmit, formState, reset } = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [userExist, setUserExist] = useState<boolean>(false);

  useEffect(() => {
    if (email) {
      setUserExist(true);
    }
  }, []);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        comment: '',
      });
    }
  }, [formState]);

  const submit$form: SubmitHandler<FieldValues> = async ({ content }) => {
    if (content === '') {
      alert('글을 입력하셔야 합니다!');
      return;
    }

    setLoading(true);
    const id = uuidv4();
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + `/comments-add`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          content,
          writer: email,
          article: articleid,
        }),
      }
    );
    const result = await response.text();
    if (result === '실패') {
      alert('죄송합니다. 등록을 하지 못했습니다.');
      setLoading(false);
      return;
    }
    location.reload();
  };

  if (!userExist) {
    return <></>;
  }

  return (
    <form
      onSubmit={handleSubmit(submit$form)}
      className={style['form']}
      id="comment-form"
    >
      <input
        type={'text'}
        {...register('content')}
        className={style['content']}
        id="comment-form__content"
      />
      <input
        type={'submit'}
        disabled={loading}
        className={style['submit']}
        value={'전송'}
        id="comment-form__submit"
      />
    </form>
  );
}
