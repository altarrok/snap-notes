import { type NextPage } from "next";
import { Layout } from "~/components/Layout";
import { SignInButton } from "~/components/auth/SignInButton";
import { SignInOutModal } from "~/components/auth/SignInOutModal";
import { Notebook } from "~/components/notebook/Notebook";

const Home: NextPage = () => {
  return (
    <Layout>
      <Notebook />
      <SignInButton />
    </Layout>
  );
};

export default Home;
