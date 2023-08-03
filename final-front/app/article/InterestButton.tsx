'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar as solidStar,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import style from '@/styles/article/InterestButton.module.scss';
import { useAuthStore } from '@/store/auth';

interface Props {
  articleid: string;
  writer: string;
}

export default function Interest({ articleid, writer }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [star, setStar] = useState<IconDefinition>(regularStar);
  const { email, name } = useAuthStore();

  useEffect(() => {
    if (name !== null && writer !== name) {
      setShow(true);
      (async () => {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND + '/interest-whether',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: email,
              article: articleid,
            }),
          }
        );
        const data = await response.json();
        if (data === true) {
          setStar(solidStar);
        }
      })();
    }
  }, []);

  const click$button = async () => {
    setLoading(true);
    if (star === regularStar) {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND + '/interest-add',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: email,
            article: articleid,
          }),
        }
      );
      const data = await response.json();
      if (data === true) {
        setStar(solidStar);
      }
    } else {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND + '/interest-delete',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: email,
            article: articleid,
          }),
        }
      );
      const data = await response.json();
      if (data === false) {
        setStar(regularStar);
      }
    }
    setLoading(false);
  };

  if (!show) {
    return <></>;
  } else {
    return (
      <section className={style['section']}>
        <button
          onClick={click$button}
          disabled={loading}
          className={style['button']}
          id="article__interest-button"
        >
          <FontAwesomeIcon icon={star} />
        </button>
      </section>
    );
  }
}
