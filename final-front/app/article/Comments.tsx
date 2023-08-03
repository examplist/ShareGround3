'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth';
import Comment from '@/app/article/Comment';
import { makePhotoURL } from '@/utils/comment-photo';

interface CommentInputType {
  id: string;
  content: string;
  time: string;
  writername: string | null;
  writerphoto: number[] | null;
}

export interface CommentType {
  id: string;
  content: string;
  time: string;
  writername: string;
  writerphoto: string;
}

interface Props {
  articleid: string;
}

export default function Comments({ articleid }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [commentData, setCommentData] = useState<CommentType[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const { name } = useAuthStore();
  useEffect(() => {
    setLoading(true);
    let tempCommentData: CommentType[] = [];
    (async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND + `/comments-get/${articleid}`
      );
      const data: CommentInputType[] = await response.json();
      data.forEach((datum) => {
        const obj: CommentType = {
          id: '',
          content: '',
          time: '',
          writername: '',
          writerphoto: '',
        };
        obj.id = datum.id;
        obj.content = datum.content;
        obj.time = datum.time;
        obj.writername = datum.writername ? datum.writername : '(탈퇴했음)';
        obj.writerphoto = datum.writerphoto
          ? makePhotoURL(datum.writerphoto)
          : '/default-profile.png';
        tempCommentData = [...tempCommentData, obj];
      });
      setCommentData(tempCommentData);
      setLoading(false);
    })();
  }, []);
  useEffect(() => {
    if (name) {
      setCurrentUser(name);
    }
  }, []);

  if (loading) {
    return <div>로딩 중</div>;
  }

  return (
    <section>
      {commentData.map(
        ({ id, content, time, writername, writerphoto }, index) => (
          <Comment
            id={id}
            content={content}
            time={time}
            writername={writername}
            writerphoto={writerphoto}
            key={index}
            currentUser={currentUser}
          />
        )
      )}
    </section>
  );
}
