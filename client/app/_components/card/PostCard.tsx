"use client";
import { Post } from "@/app/utils/types";
import axios from "axios";
import Link from "next/link";
import { Share2, MessageSquare } from "lucide-react";

export const PostCard = ({ post }: { post: Post }) => {
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    const shareData = {
      title: post?.title,
      text: post?.content?.substring(0, 100),
      url: `${window.location.origin}/posts/${post?.id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log(err);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      // Custom toast would be better here, but keeping it simple
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${post.id}/share`,
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Link href={`/posts/${post.id}`} className="block h-full">
      {/* MODIFICATIONS:
          - bg-white is now distinct against the #F8F8F8 background
          - shadow is slightly deeper but still soft (shadow-md)
          - removed the border-t at the bottom to keep it "borderless"
      */}
      <article className="group relative flex h-full flex-col bg-white p-8 rounded-[2rem] shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
        {/* Category & Date */}
        <div className="mb-6 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-500 bg-gray-100 px-3 py-1 rounded-full group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
            {post.category}
          </span>
          <time className="font-mono text-[9px] uppercase tracking-widest text-gray-300">
            {new Date(post.created_at).toLocaleDateString()}
          </time>
        </div>

        {/* Content Section */}
        <div className="flex-grow space-y-4">
          <h2 className="font-serif text-2xl font-light leading-snug text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
            {post.title}
          </h2>
          <p className="line-clamp-3 font-serif text-base leading-relaxed text-gray-500/80 font-light">
            {post.content}
          </p>
        </div>

        {/* Footer: Using spacing instead of border-t to create separation */}
        <div className="mt-10 flex items-center justify-between pt-4">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 font-mono text-[9px] text-gray-600 group-hover:bg-black group-hover:text-white transition-all">
              {post.author?.charAt(0).toUpperCase()}
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
              {post.author}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-300 group-hover:text-gray-500">
              <MessageSquare size={13} strokeWidth={1.5} />
              <span>{post.comments.length}</span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 font-mono text-[10px] text-gray-300 hover:text-purple-600"
            >
              <Share2 size={13} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
};
