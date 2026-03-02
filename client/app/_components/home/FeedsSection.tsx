"use client";
import axios from "axios";
import { PostCard } from "../card/PostCard";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@/app/utils/types";

const FeedsSection = ({ selectedCategory }: { selectedCategory: string }) => {
  const base_url = process.env.NEXT_PUBLIC_API_URL;

  const { data: trending = [], isLoading: trendingLoading } = useQuery<Post[]>({
    queryKey: ["trending"],
    queryFn: async () => {
      const res = await axios.get(`${base_url}/posts/trending`);
      return Array.isArray(res.data) ? res.data : res.data.trending || [];
    },
  });

  const { data: posts = [], isLoading } = useQuery<Post[]>({
    queryKey: ["posts", selectedCategory],
    queryFn: async () => {
      const res = await axios.get(
        `${base_url}/posts?category=${selectedCategory}`,
      );
      return res.data;
    },
  });

  const trendingIds = new Set(trending.map((p) => p.id));
  const uniqueLatestPosts = posts.filter((post) => !trendingIds.has(post.id));

  if (isLoading || trendingLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center font-mono text-[10px] uppercase tracking-[0.5em] text-gray-400">
        <span className="animate-pulse italic">Loading Whispers...</span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] space-y-32 py-12">
      {/* 01. Trending Section - High Visual Contrast */}
      {trending.length > 0 && (
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="mb-12 px-2">
            <h3 className="font-serif text-4xl italic text-black">
              Top Echoes
            </h3>
            <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-gray-400 mt-2">
              High_Intensity_Signals ({trending.length})
            </p>
          </div>

          {/* Clean grid with wide gaps instead of lines */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* 02. Latest Posts Section - Simple & Minimal */}
      <section>
        <div className="mb-12 px-2">
          <h3 className="font-serif text-4xl italic text-black">
            {selectedCategory.trim() === ""
              ? "Recent Whispers"
              : `In ${selectedCategory}`}
          </h3>
          <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-gray-400 mt-2">
            Live_Signal_Stream
          </p>
        </div>

        {uniqueLatestPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="h-px w-12 bg-gray-200 mb-6" />
            <p className="font-serif italic text-gray-400 text-xl">
              The void is silent.
            </p>
          </div>
        ) : (
          /* FIX: Removed 'bg-black' and 'gap-px'. Switched to a standard clean grid. */
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {uniqueLatestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default FeedsSection;
