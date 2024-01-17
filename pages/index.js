import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';
import Image from 'next/image';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import styles from '../styles/player.module.css'
import AnimatedLogo from '/public/images/gyst_loop.gif'

export default function Index({ posts, globalData, allEpisodes }) {

  return (
    <Layout>
      <div className={`${styles.wrapper} before:bg-white before:backdrop-blur-lg before:dark:bg-black before:dark:bg-opacity-30 before:bg-opacity-10 `}>
        <Image
          src={AnimatedLogo}
          width={500}
          height={420}
          alt="Gyst Rewind logo"
        />
      </div>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <main className="w-full">
        <h1
          className="text-3xl lg:text-5xl text-center mb-12 font-extrabold text-transparent bg-clip-text"
          style={{
            height: 'fit-content',
            lineHeight: '1.0',
            backgroundImage: 'linear-gradient(to right,black, var(--color-gradient-2), var(--color-gradient-1), var(--color-gradient-2), black)',
          }}
        >
          {globalData.blogTitle}
        </h1>
          <div style={{
            // display: 'none',
            backgroundColor: 'red',
            width: '50vw',
            height: '50vh',
            overflow: 'auto'
          }}>
            <pre>
              {JSON.stringify(allEpisodes, null, 2)}
            </pre>
          </div>
        <ul>
         {allEpisodes.map(episode => (
            <li key={episode.id} className="border-green-300 border-2 my-2">
              <span className="flex align-middle items-center">
              <h3 className="bg-red-300">{episode.title}</h3>
              <Image className="rounded-full" src={episode.artwork_url} alt="logo" width={50} height={50} />
              </span>
              <div className="bg-blue-200" dangerouslySetInnerHTML={{__html: episode.description}} />
              <pre className="overflow-auto">
                {JSON.stringify(episode, null, 2)}
              </pre>
            </li>
         ))}
        </ul>
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

export async function getStaticProps() {
  const items = await fetch(`https://www.buzzsprout.com/api/${process.env.PODCAST_ID}/episodes.json`, {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers:{
      "Authorization": `Token token=${process.env.API_KEY}`}
  })
  const res = await items.json()
  const posts = getPosts();
  const globalData = getGlobalData();

  return { props: { posts, globalData, allEpisodes: res } };
}
