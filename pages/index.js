import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import { useRef } from 'react';
import styles from '../styles/player.module.css'
import dynamic from 'next/dynamic';

const DynamicReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

export default function Index({ posts, globalData }) {
  const videoPlayerRef = useRef(null);

  return (
    <Layout>
      <div className={styles.wrapper}>
        <DynamicReactPlayer
          ref={videoPlayerRef}
          playsinline={true}
          style={{
            top: 0,
          }}
          loop={true}
          playbackRate={0.5}
          controls={false}
          volume={0}
          muted={true}
          playing={true}
          url="https://youtu.be/or-RNyQblxQ"
        />
      </div>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <main className="w-full">
        <h1
          className="text-3xl lg:text-5xl text-center mb-12 font-extrabold text-transparent text-8xl bg-clip-text"
          style={{
            height: 'fit-content',
            lineHeight: '1.2',
            backgroundImage: 'linear-gradient(to right,black, var(--color-gradient-2), var(--color-gradient-1), var(--color-gradient-2), black)',
          }}
        >
          {globalData.blogTitle}
        </h1>
        <ul className="w-full">
          {posts.map((post) => (
            <li
              key={post.filePath}
              className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
            >
              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`/posts/[slug]`}
              >
                <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                  {post.data.date && (
                    <p className="uppercase mb-3 font-bold opacity-60">
                      {post.data.date}
                    </p>
                  )}
                  <h2 className="text-2xl md:text-3xl">{post.data.title}</h2>
                  {post.data.description && (
                    <p className="mt-3 text-lg opacity-60">
                      {post.data.description}
                    </p>
                  )}
                  <ArrowIcon className="mt-4" />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPosts();
  const globalData = getGlobalData();

  return { props: { posts, globalData } };
}
