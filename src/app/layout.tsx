import { Inter } from 'next/font/google';
import ProviderChakra from './ProviderChakra';
import { ProviderDapp } from './ProviderDApp';
import { ProviderWeb3Modal } from './ProviderWeb3Modal';

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
        <ProviderWeb3Modal>
          <ProviderDapp>
            <ProviderChakra>{children}</ProviderChakra>
          </ProviderDapp>
        </ProviderWeb3Modal>
      </body>
    </html>
  );
}
