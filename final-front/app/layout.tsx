import Header from '@/app/common/Header';
import Footer from '@/app/common/Footer';
import Auth from '@/app/common/Auth';
import Following from '@/app/common/Following';
import '@/styles/globals.css';

export const metadata = {
  title: 'ShareGround',
  description: '블로그 플랫폼',
};

export default function rootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Auth />
        <Header />
        {children}
        <Footer />
        <Following />
      </body>
    </html>
  );
}
