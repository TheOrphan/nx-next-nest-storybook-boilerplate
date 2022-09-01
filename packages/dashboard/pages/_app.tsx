import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";
import { RecoilRoot } from "recoil";
import "./styles.css";

import type { AppProps } from "next/app";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <RecoilRoot>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "dark",
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}
