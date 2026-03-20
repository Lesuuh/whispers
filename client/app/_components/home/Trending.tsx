import { PostCard } from "../card/PostCard";

import { useTrending } from "@/app/hooks/useTrending";

const Trending = () => {
  const { trending, isLoading } = useTrending();

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
            {Array.from({ length: 6 }).map((_, i) => (
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
    </div>
  );
};

export default Trending;
