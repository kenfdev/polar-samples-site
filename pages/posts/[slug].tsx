import Head from 'next/head';
import { format, parseISO } from 'date-fns';
import { allPosts, Post } from 'contentlayer/generated';

export async function getStaticPaths() {
  const paths: string[] = allPosts.map((post) => post.url);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post: Post = allPosts.find(
    (post) => post._raw.flattenedPath === params.slug
  );
  return {
    props: {
      post,
    },
  };
}

const PostLayout = ({ post }: { post: Post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className="mx-auto lg:max-w-4xl sm:w-full">
        <div className="text-center mb-8">
          <time dateTime={post.date} className="text-xs text-gray-600 mb-1">
            {format(parseISO(post.date), 'LLLL d, yyyy')}
          </time>
          <h1>{post.title}</h1>
        </div>

        <div className="mb-8" dangerouslySetInnerHTML={{ __html: post.body.html }} />

        {post.code_iframe ? (
          <div>
            <h2>Play with the code by yourself</h2>
            <iframe
              src={post.code_iframe}
              className="h-full w-full"
              style={{ width: '100%', height: '500px' }}
            />
          </div>
        ) : null}
      </article>
    </>
  );
};

export default PostLayout;
