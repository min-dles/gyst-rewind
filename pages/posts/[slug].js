import { getGlobalData } from '../../utils/global-data';
import gystLogo from '../../public/images/gyst_logo.jpeg';

import Head from 'next/head';
import Link from 'next/link';
import ArrowIcon from '../../components/ArrowIcon';
import Image from 'next/image';
import CustomLink from '../../components/CustomLink';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import SEO from '../../components/SEO';
import ArticleText from '../../components/ArticleText';

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  Head,
};

export default function PostPage({
  globalData,
  currentEpisode,
  previousEpisode,
  nextEpisode,
}) {

  return (
    <Layout>
      <SEO
        title={`${currentEpisode.title} - ${globalData.name}`}
        description={currentEpisode.description}
      />
      <Header name={globalData.name} />
      <article className="px-6 md:px-0">
        <header>
          <h1 className="text-3xl md:text-5xl dark:text-white text-center mb-12">
            {currentEpisode.title}
          </h1>
        </header>
        <main>
          <article className="prose dark:prose-dark">
            {currentEpisode.description && (
            <ArticleText>
              <p
                className="text-xl mb-4 px-2 [&_p]:break-all [&_p]:text-pretty md:[&_p]:break-keep"
                dangerouslySetInnerHTML={{ __html: currentEpisode.description }}
              />
            </ArticleText>
            )}
          </article>
        </main>
        <div className="grid md:grid-cols-3 lg:-mx-24 mt-12">
          {previousEpisode && (
            <Link href={`/posts/${previousEpisode.id}`}>
              <a className="py-8 px-10 text-center md:text-right first:rounded-t-lg md:first:rounded-tr-none md:first:rounded-l-lg last:rounded-r-lg first last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 last:border-t md:border-r-0 md:last:border-r md:last:rounded-r-none flex flex-col">
                <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">
                  Previous
                </p>
                <h4 className="text-2xl text-gray-700 mb-6 dark:text-white">
                  {previousEpisode.title}
                </h4>
                <ArrowIcon className="transform rotate-180 mx-auto md:mr-0 mt-auto" />
              </a>
            </Link>
          )}
          <Link href="/">
            <a className="py-8 px-10 text-center md:text-center md:first:rounded-t-lg last:rounded-b-lg first:rounded-l-lg md:last:rounded-bl-none md:last:rounded-r-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-t-0 first:border-t first:rounded-t-lg md:border-t border-b-0 last:border-b flex flex-col items-center">
              <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">
                Home
              </p>
              <div className="w-16 h-16 rounded-full">
                <Image
                  src={gystLogo}
                  alt="Gyst Rewind logo"
                  className="rounded-full"
                  width={64}
                  height={64}
                  objectFit='contain'
                />
              </div>
            </a>
          </Link>
          {nextEpisode && (
            <Link href={`/posts/${nextEpisode.id}`}>
              <a className="py-8 px-10 text-center md:text-left md:first:rounded-t-lg last:rounded-b-lg first:rounded-l-lg md:last:rounded-bl-none md:last:rounded-r-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-t-0 first:border-t first:rounded-t-lg md:border-t border-b-0 last:border-b flex flex-col">
                <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">
                  Next
                </p>
                <h4 className="text-2xl text-gray-700 mb-6 dark:text-white">
                  {nextEpisode.title}
                </h4>
                <ArrowIcon className="mt-auto mx-auto md:ml-0" />
              </a>
            </Link>
          )}
        </div>
      </article>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="absolute -top-32 opacity-30 dark:opacity-50"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const globalData = getGlobalData();
  const items = await fetch(`https://www.buzzsprout.com/api/${process.env.PODCAST_ID}/episodes.json`, {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
      "Authorization": `Token token=${process.env.API_KEY}`
    }
  })
  const res = await items.json()
  const currentEpisode = res.find(episode => (params.slug === String(episode.id)));
  const allIdsAsStrings = res.map(({ id }) => `${id}`);
  const currentEpisodeIndex = allIdsAsStrings.indexOf(params.slug);
  const previousEpisode = res[currentEpisodeIndex + 1] || null;
  const nextEpisode = res[currentEpisodeIndex - 1] || null;

  return {
    props: {
      globalData,
      currentEpisode,
      previousEpisode,
      nextEpisode,
    },
  };
};

export const getStaticPaths = async () => {
  const items = await fetch(`https://www.buzzsprout.com/api/${process.env.PODCAST_ID}/episodes.json`, {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
      "Authorization": `Token token=${process.env.API_KEY}`
    }
  });
  const res = await items.json();
  const paths = res.map((episode) => ({ params: { slug: episode.id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};