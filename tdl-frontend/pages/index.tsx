import { Inter } from 'next/font/google';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import Main from '@/components/Main';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <div className={`${styles.main} ${inter.className}`}>
        <ConnectButton />
        <Main />
      </div>
    </>
  );
}
