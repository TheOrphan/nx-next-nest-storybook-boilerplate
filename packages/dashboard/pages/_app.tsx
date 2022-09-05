import type { AppProps } from 'next/app';

import { MantineProvider } from '@mantine/core';
import { RecoilRoot } from 'recoil';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <RecoilRoot>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: 'dark' }}
      >
        <Component key={router.asPath} {...pageProps} />
      </MantineProvider>
    </RecoilRoot>
  );
}
