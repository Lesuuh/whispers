"use client";

import { PostCard } from "../card/PostCard";

import { usePosts } from "@/app/hooks/usePosts";

const FeedsSection = ({ selectedCategory }: { selectedCategory: string }) => {
  const { posts, isLoading } = usePosts(selectedCategory);

  console.log(posts);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1400px] space-y-32 py-12 animate-pulse">
        {/* Skeleton for Trending Title */}
        <section>
          <div className="mb-12 px-2 space-y-3">
            <div className="h-8 w-48 bg-gray-200 rounded" />
            <div className="h-3 w-64 bg-gray-200 rounded" />
          </div>

          {/* Skeleton Grid */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </section>

        {/* Skeleton for Latest Section */}
        <section>
          <div className="mb-12 px-2 space-y-3">
            <div className="h-8 w-56 bg-gray-200 rounded" />
            <div className="h-3 w-72 bg-gray-200 rounded" />
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] space-y-32 py-12">
      {/* 01. Trending Section - High Visual Contrast */}
      {/* {trending.length > 0 && (
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="mb-12 px-2">
            <h3 className="font-serif text-4xl italic text-black">
              Top Echoes
            </h3>
            <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-gray-400 mt-2">
              High_Intensity_Signals ({trending.length})
            </p>
          </div>

         
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )} */}

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

        {posts?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="h-px w-12 bg-gray-200 mb-6" />
            <p className="font-serif italic text-gray-400 text-xl">
              The void is silent.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {posts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default FeedsSection;
