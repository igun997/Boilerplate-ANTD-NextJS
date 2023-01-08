import Head from 'next/head';
import ErrPage from '../components/ErrBoundaries';

export default function Custom404() {
  return (
    <div>
      <Head>
        <title>Halaman Tidak Ditemukan</title>
      </Head>
      <ErrPage />
    </div>
  );
}
