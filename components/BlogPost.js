import Link from 'next/link';
import ExternalLink from './ExternalLink';

const BlogPost = ({ title, brief, slug, totalReactions }) => {
  
  return (
    <ExternalLink href={`https://blog.greenroots.info/${slug}`}>
        <div className="mb-8 w-full">
          <div className="flex flex-col md:flex-row justify-between">
            <h4 className="text-lg md:text-xl font-medium mb-2 w-full text-gray-900 dark:text-gray-100">
              {title}
            </h4>
            <p className="text-gray-500 text-left md:text-right w-32 mb-4 md:mb-0">
              {`${totalReactions} reactions`}
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400">{brief}</p>
        </div>
    </ExternalLink>
  );
};

export default BlogPost;
