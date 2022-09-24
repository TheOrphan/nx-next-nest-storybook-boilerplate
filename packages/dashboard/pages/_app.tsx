import type { AppProps } from 'next/app';

import { AppShell, MantineProvider, Navbar } from '@mantine/core';
import { useIdle, useInterval } from '@mantine/hooks';
import { RecoilRoot } from 'recoil';
import { useRouter } from 'next/router';
import { NavbarNested } from 'packages/dashboard/modules/layout/navbar';
import ms from 'ms';
import { useEffect, useState } from 'react';
import { deleteCookie } from 'cookies-next';

export function MyApp({ Component, pageProps }: AppProps) {
  const [seconds, setSeconds] = useState(0);
  const interval = useInterval(() => setSeconds((s) => s + 1), 1000);
  const { statusCode: isPageError } = pageProps;
  const idle = useIdle(ms('5m'));
  const router = useRouter();

  useEffect(() => {
    interval.start();
    console.log(idle, seconds);
    if (idle) {
      deleteCookie('_o');
      router.push('/auth/login');
    }
    return interval.stop;
  }, [idle, interval]);

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
