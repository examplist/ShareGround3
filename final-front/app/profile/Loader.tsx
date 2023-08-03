import { forwardRef } from 'react';
import style from '@/styles/profile/Loader.module.scss';

type Refs = HTMLDivElement;
type Props = {};

const Loader = forwardRef<Refs, Props>(({}, reference) => {
  return (
    <section className={style['section']}>
      <div className={style['loader']} ref={reference}>
        <div className={`${style['l']} ${style['l1']}`}></div>
        <div className={`${style['l']} ${style['l2']}`}></div>
        <div className={`${style['l']} ${style['l3']}`}></div>
        <div className={`${style['l']} ${style['l4']}`}></div>
      </div>
    </section>
  );
});

export default Loader;
