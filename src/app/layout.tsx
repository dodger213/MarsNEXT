import MainWrapper from './MainWrapper';
import ProviderChakra from './ProviderChakra';
import { ProviderDapp } from './ProviderDApp';
import { ProviderWeb3Modal } from './ProviderWeb3Modal';

export const metadata = {
  title: 'Mars Next || A community centric decentralized reward distribution system.',
  description:
    'Mars Next is a decentralized protocol of secured smart contracts, focused of community rewards system.'
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
