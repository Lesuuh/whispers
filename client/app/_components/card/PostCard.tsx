import { Post } from "@/app/utils/types";
import Link from "next/link";

export const PostCard = ({ post }: { post: Post }) => {
  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.content,
      url: `${window.location.origin}/posts/${post.id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Share failed", error);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert("Whisper link copied");
    }
  };
  return (
    <article className="group relative w-full bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-purple-300 transition-all duration-500 hover:-translate-y-1">
      {/* Colored accent bar */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-black to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <span className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 text-xs font-semibold uppercase tracking-wide">
            {post.category}
          </span>
          <time className="text-xs text-gray-400 mt-1 whitespace-nowrap">
            {new Date(post.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
          {post.title}
        </h2>

        {/* Content Preview */}
        <p className="text-gray-600 font-heading leading-relaxed mb-6 line-clamp-3 flex-grow">
          {post.content}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            {/* Author Avatar Placeholder */}
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-sm font-semibold">
              {post.author?.charAt(0).toUpperCase()}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                {post.author}
              </span>
              {/* Comments Count */}
              <span className="text-gray-400">•</span>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.84 9.84 0 01-4-.81L3 21l1.81-5.21A8.966 8.966 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span>{post.comments.length}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Share Button */}
            <button
              className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300"
              onClick={handleShare}
              aria-label="Share post"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </button>

            {/* Read More Button */}
            <Link href={`/posts/${post.id}`}>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-purple-600 transition-all duration-300 group-hover:gap-3">
                Read
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
