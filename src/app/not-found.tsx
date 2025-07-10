import Image from 'next/image';
import Link from 'next/link';

const NotFound = (): React.ReactNode => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 sm:gap-5 lg:gap-7 py-5 sm:py-7 lg:py-9">
      <div className="w-3/4 grid place-items-center">
        <Image
          alt="not-found"
          height={475}
          src="https://storage.googleapis.com/komerce/assets/LP-Rajaongkir/not-found_ylhhyw.svg"
          width={704}
        />
      </div>
      <Link
        aria-label="Daftar Sekarang"
        className="group bg-komship-main active:bg-semi-dark-komship transition-colors duration-300 min-h-12 rounded-3xl px-5 flex
          items-center gap-2 border border-primary-main whitespace-nowrap font-semibold text-semi-komship"
        href="/"
      >
        Kembali ke Beranda
        <Image
          alt="arrow"
          className="w-0 h-auto group-hover:w-7 transition-all duration-500"
          height={28}
          src="https://storage.googleapis.com/komerce/rajaongkir/Arrow-sec-right.svg"
          width={28}
        />
      </Link>
    </div>
  );
};

export default NotFound;
