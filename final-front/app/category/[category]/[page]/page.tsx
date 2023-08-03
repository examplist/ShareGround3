import { categoryEngToKor } from '@/utils/category-language';
import Card from '@/app/common/Card';
import Paginate from '../../Paginate';
import style from '@/styles/category/page.module.scss';
import { Datum } from '@/app/common/Card';

type Props = {
  params: {
    category: string;
    page: string;
  };
};

export default async function category({ params }: Props) {
  const { category, page } = params;

  const response = await fetch(
    process.env.NEXT_PUBLIC_BACKEND + `/category/${category}/${page}`
  );
  const data = await response.json();

  if (!data.succeeded) {
    return <></>;
  }

  const { dtos, pageCount } = data;

  return (
    <main className={style['main']}>
      <h1 className={style['category']} id="category-page__title">
        {categoryEngToKor(category)}
      </h1>
      {dtos.map((dto: Datum, index: number) => {
        return <Card datum={dto} key={index} />;
      })}
      <Paginate
        category={category}
        pageCount={pageCount}
        currentPage={parseInt(page)}
      />
    </main>
  );
}
