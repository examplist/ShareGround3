import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import HeaderCategory from '@/app/common/HeaderCategory';
import HeaderSearch from '@/app/common/HeaderSearch';
import HeaderAuth from '@/app/common/HeaderAuth';
import style from '@/styles/app/Header.module.scss';

export default function Header() {
  return (
    <header className={style['header']}>
      <div className={style['logo']} id="header-logo">
        <Link href={'/'}>ShareGround</Link>
      </div>
      <div className={style['empty1']}></div>
      <HeaderCategory />
      <div className={style['empty2']}></div>
      <HeaderSearch />
      <div className={style['create']}>
        <Link href={'/create'} id="to-create">
          <FontAwesomeIcon icon={faPen} />
        </Link>
      </div>
      <HeaderAuth />
    </header>
  );
}
