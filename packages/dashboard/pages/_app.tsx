import type { AppProps } from 'next/app';

import { AppShell, MantineProvider, Navbar } from '@mantine/core';
import { RecoilRoot } from 'recoil';
import { useRouter } from 'next/router';
import { NavbarNested } from 'packages/dashboard/modules/layout/navbar';

export function MyApp({ Component, pageProps }: AppProps) {
  const { statusCode: isPageError } = pageProps;
  const router = useRouter();
  return (
    <RecoilRoot>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: 'dark' }}
      >
        {!isPageError &&
        !['/auth', '/error'].some((v) => router.pathname.includes(v)) ? (
          <AppShell
            padding="md"
            navbar={
              <Navbar width={{ base: 300 }} height={500} p="xs">
                <NavbarNested />
              </Navbar>
            }
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
          >
            <Component key={router.asPath} {...pageProps} />
          </AppShell>
        ) : (
          <Component key={router.asPath} {...pageProps} />
        )}
      </MantineProvider>
    </RecoilRoot>
  );
}

export default MyApp;
