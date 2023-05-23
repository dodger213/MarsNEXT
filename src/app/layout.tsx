import { Inter } from 'next/font/google';
import ProviderChakra from './ProviderChakra';
import { ProviderDapp } from './ProviderDApp';
import { ProviderWeb3Modal } from './ProviderWeb3Modal';
import MainWrapper from './MainWrapper';
import { Suspense } from 'react';

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
      <body>
        <ProviderChakra>
          <ProviderWeb3Modal>
            <ProviderDapp>
              <MainWrapper>{children}</MainWrapper>
            </ProviderDapp>
          </ProviderWeb3Modal>
        </ProviderChakra>
      </body>
    </html>
  );
}
