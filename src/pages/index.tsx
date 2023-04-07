import { type NextPage } from "next";
import { useState } from "react";
import { SignInButton } from "~/components/auth/SignInButton";
import { SignInOutModal } from "~/components/auth/SignInOutModal";
import { SignInOutModalContext } from "~/components/auth/SignInOutModalContext";
import { CreateNoteCard } from "~/components/create-note/CreateNoteCard";
import { Notebook } from "~/components/notebook/Notebook";

const Home: NextPage = () => {
  const [isSignInOutModalOpen, setIsSignInOutModalOpen] = useState(false);

  return (
    <SignInOutModalContext.Provider value={{ isSignInOutModalOpen, setIsSignInOutModalOpen }}>
      <SignInOutModal />
      <Notebook />
      <SignInButton />
    </SignInOutModalContext.Provider>
  );
};

export default Home;
