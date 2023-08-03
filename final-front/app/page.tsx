import Welcome from '@/app/home/Welcome';
import Intro from '@/app/home/Intro';
import style from '@/styles/home/page.module.scss';

export default function home() {
  return (
    <main className={style.a}>
      <Welcome />
      <Intro />
    </main>
  );
}
