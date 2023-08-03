import { useAuthStore } from '@/store/auth';
import { ChangeEvent, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { LoadStatus } from '@/app/profile/Account';
import style from '@/styles/profile/AccountPhoto.module.scss';
import { deletePhoto, setGetPhoto } from '@/utils/auth/photo';

export default function ProfilePhoto({
  loadStatus,
}: {
  loadStatus: LoadStatus;
}) {
  const { loading, setLoading } = loadStatus;
  const { email, photo, setPhoto: storeSetPhoto } = useAuthStore();
  const userphoto = photo ? photo : '/default-profile.png';
  const refInputPhoto = useRef<HTMLInputElement>(null);

  const change$inputPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !email) {
      return;
    }
    console.log('in changeinputphoto');
    setLoading(true);
    const f_ArrayBuffer = await e.target.files[0].arrayBuffer();
    console.log(f_ArrayBuffer);
    const f_Uint8Array = new Uint8Array(f_ArrayBuffer);
    console.log(f_Uint8Array);
    const f_ArrayFromUint8Array = Array.from(f_Uint8Array);
    console.log(f_ArrayFromUint8Array);
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + `/change-userphoto`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          photo: f_ArrayFromUint8Array,
        }),
      }
    );
    const result = await response.text();
    console.log(result);
    if (result !== '성공') {
      alert(result);
      setLoading(false);
      return;
    }
    deletePhoto(storeSetPhoto);
    setGetPhoto(f_ArrayFromUint8Array, storeSetPhoto);
    setLoading(false);
  };

  const click$changePhoto = () => {
    refInputPhoto.current?.click();
  };

  return (
    <section className={style['section']}>
      <div className={style['container']}>
        <img src={userphoto} className={style['img']} />
        <button
          className={style['edit']}
          disabled={loading}
          onClick={click$changePhoto}
        >
          <FontAwesomeIcon icon={faUpload} />
        </button>
      </div>
      <input
        type={'file'}
        style={{ display: 'none' }}
        ref={refInputPhoto}
        accept="image/jpeg, image/jpg, image/png"
        onChange={change$inputPhoto}
      />
    </section>
  );
}
