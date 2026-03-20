import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../lib/db";
import { useQuery } from "@tanstack/react-query";
import { Post } from "../utils/types";
import axios from "axios";

const base_url = process.env.NEXT_PUBLIC_API_URL;

export function useTrending() {
  const localTrending = useLiveQuery(() => db.trending.toArray());

  const query = useQuery<Post[]>({
    queryKey: ["trending"],
    queryFn: async () => {
      const res = await axios.get(`${base_url}/posts/trending`);
      const data: Post[] = res.data.trending || [];

      console.log("PARSED DATA:", data);

      await db.trending.clear();
      await db.trending.bulkPut(data);

      return data;
    },
    staleTime: 1000 * 60 * 5,
    // initialData: localTrending ?? [],
  });

  return {
    trending: localTrending ?? [],
    isLoading: query.isLoading && !localTrending?.length,
    isError: query.isError,
  };
}
