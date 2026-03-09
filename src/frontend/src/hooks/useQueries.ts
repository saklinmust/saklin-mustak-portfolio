import { useQuery } from "@tanstack/react-query";
import type { Portfolio } from "../backend.d.ts";
import { useActor } from "./useActor";

export function useGetPortfolio() {
  const { actor, isFetching } = useActor();
  return useQuery<Portfolio>({
    queryKey: ["portfolio"],
    queryFn: async () => {
      if (!actor) {
        return {
          title: "Saklin Mustak Portfolio",
          projects: [],
          owner: "Saklin Mustak",
        };
      }
      return actor.getPortfolio();
    },
    enabled: !!actor && !isFetching,
  });
}
