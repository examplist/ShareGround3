'use client';

import { useAuthStore } from '@/store/auth';
import { loginLocal } from '@/utils/auth/data';
import { getPhoto, makePhotoEnv } from '@/utils/auth/photo';
import { useEffect } from 'react';

export default function Auth() {
  const { setData, setPhoto: storeSetPhoto } = useAuthStore();

  useEffect(() => {
    const { status, email, name } = loginLocal();
    setData(status, email, name);
    makePhotoEnv();
    getPhoto(storeSetPhoto);
  }, []);

  return <></>;
}
