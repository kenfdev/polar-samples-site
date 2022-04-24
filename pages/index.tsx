import Link from 'next/link';
import { compareDesc, format, parseISO } from 'date-fns';
import { allPosts, Post } from 'contentlayer/generated';
import { stripHtml } from 'string-strip-html';

export async function getStaticProps() {
  const posts: Post[] = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  return { props: { posts } };
}

function PostCard(post: Post) {
  return (
    <div className="mb-8">
      <h2 className="text-xl">
        <Link href={post.url}>
          <a className="text-blue-700 no-underline hover:text-blue-900">
            {post.title}
          </a>
        </Link>
      </h2>
      <time dateTime={post.date} className="block text-xs text-gray-600 mb-2">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <div className="text-sm line-clamp-2">{stripHtml(post.body.html).result.substring(0, 1000)}</div>
    </div>
  );
}

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <div className="max-w-xl mx-auto pb-8">
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  );
}
