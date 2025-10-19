import { Post } from "@/app/utils/types";
import axios from "axios";
import Link from "next/link";

export const PostCard = ({ post }: { post: Post }) => {
  const handleShare = async () => {
    const postText = post?.content
      ? post.content.length > 100
        ? post.content.substring(0, 100) + "..."
        : post.content
      : "";

    const shareData = {
      title: post?.title || "Check this Whisper",
      text: postText,
      url: `${window.location.origin}/posts/${post?.id}`,
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

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${post.id}/share`
      );
    } catch (err) {
      console.error("Share count update failed:", err);
    }
  };

  return (
    <Link href={`/posts/${post.id}`}>
      <article className="group relative w-full bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg cursor-pointer">
        {/* Gradient accent bar on hover */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-purple-500 to-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

        <div className="p-4 sm:p-6 flex flex-col h-full">
          {/* Header with floating action button */}
          <div className="flex items-start justify-between mb-3 gap-3">
            <div className="flex-1 min-w-0">
              <span className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold uppercase tracking-wide mb-2">
                {post.category}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                {post.title}
              </h2>
            </div>

            {/* Floating share button - appears on hover */}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleShare();
              }}
              className="
    flex-shrink-0 p-2 bg-purple-50 text-purple-600 rounded-lg 
    hover:bg-purple-100 transition-all duration-300
    opacity-100 lg:opacity-0 lg:group-hover:opacity-100
  "
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
          </div>

          {/* Content Preview */}
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-grow">
            {post.content}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full  bg-black flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {post.author?.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                  {post.author}
                </span>
                <time className="text-[10px] sm:text-xs text-gray-400">
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Comments count */}
              <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
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

              {/* Share count - only show if > 0 */}
              {post.share_count > 0 && (
                <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
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
                  <span>{post.share_count}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
