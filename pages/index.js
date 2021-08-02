import Link from 'next/link';
import { google } from 'googleapis';

import googleAuth from '@/lib/google/auth';
import { fetchThreeReecentArticles } from '@/lib/hashnode';
import Container from '../components/Container';
import BlogPost from '../components/BlogPost';
import Subscribe from '../components/Subscribe';
import ProjectCard from '../components/ProjectCard';
import VideoCard from '../components/VideoCard';

export async function getStaticProps() {
  const auth = await googleAuth.getClient();
  const youtube = google.youtube({
    auth,
    version: 'v3'
  });

  const response = await youtube.videos.list({
    id: 'R_F0gYb8NgI,vWtu4mzUgQo,xbHFdstSpvc',
    part: 'snippet,statistics'
  });

  const articles = await fetchThreeReecentArticles();
  
  return {
    props: {
      videos: response.data.items,
      articles: articles,
    },
    revalidate: 60 * 60 // 1 hour
  };
}

export default function Home({ videos, articles }) {
  console.log(videos);
  console.log(articles); 
    return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Hey, I’m Tapas Adhikary
        </h1>
        <h2 className="prose text-gray-600 dark:text-gray-400 mb-16">
          I'm a UI/UX/ML enthusiaist, writer, mentor, and creator. I work as a Senior Manager and 
          User Interface Architect at Microfocus. Do you like my blog, articles, videos, opensource work?
          –&nbsp;
          <Link href="/guestbook">
            <a>Please let me know</a>
          </Link>
          {" while you're here or "}
          <Link href="/about">
            <a>learn more about me.</a>
          </Link>
        </h2>
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 text-black dark:text-white">
          My Recent Articles
        </h3>
        {articles.map((article) => (
          <BlogPost key={article['_id']} {...article} />
        ))}
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white">
          Courses
        </h3>
        <ProjectCard
          title="React 2025"
          description="Build and deploy a modern Jamstack application using the most popular open-source software."
          href="https://react2025.com/"
          icon="react2025"
        />
        <ProjectCard
          title="Learn Next.js"
          description="A free video course for building static and server-side rendered applications with Next.js and React."
          href="https://masteringnextjs.com/"
          icon="nextjs"
        />
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-12 text-black dark:text-white">
          Recent Videos
        </h3>
        {videos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
        <Subscribe />
      </div>
    </Container>
  );
}
