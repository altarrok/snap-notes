import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { SignInOutModalContextProvider } from "~/components/auth/SignInOutModalContextProvider";
import { SignInOutModal } from "~/components/auth/SignInOutModal";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <SignInOutModalContextProvider>
        <Component {...pageProps} />
        <SignInOutModal />
      </SignInOutModalContextProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
