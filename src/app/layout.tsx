import { Nav } from '@/components/Nav/Nav';
import ProviderChakra from './ProviderChakra';
import { Inter } from 'next/font/google';
import { ProviderWeb3Modal } from './ProviderWeb3Modal';
import { ProviderDapp } from './ProviderDApp';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mars Next || A decentralized community centric reward system.',
  description:
    'Mars Next is a decentralized protocol of secured smart contracts, focused of community rewards system.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderChakra>
          <ProviderWeb3Modal>
            <ProviderDapp>{children}</ProviderDapp>
          </ProviderWeb3Modal>
        </ProviderChakra>
      </body>
    </html>
  );
}
