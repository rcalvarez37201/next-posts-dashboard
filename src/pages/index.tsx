import PostsList from "@/components/PostsList";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js Posts Dashboard</title>
        <meta name="description" content="A simple posts dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PostsList />
      </main>
    </>
  );
}
