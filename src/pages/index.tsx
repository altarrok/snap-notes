import { type NextPage } from "next";
import { useState } from "react";
import { SignInOutModal } from "~/components/auth/SignInOutModal";
import { SignInOutModalContext } from "~/components/auth/SignInOutModalContext";
import { CreateNoteWidget } from "~/components/create-note";

const Home: NextPage = () => {
  const [isSignInOutModalOpen, setIsSignInOutModalOpen] = useState(false);

  return (
    <SignInOutModalContext.Provider value={{ isSignInOutModalOpen, setIsSignInOutModalOpen }}>
      <SignInOutModal />
      <div className="h-[50rem] w-[24rem] border-black border border-solid">
        <CreateNoteWidget />
      </div>
    </SignInOutModalContext.Provider>
  );
};

export default Home;
