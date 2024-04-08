import { docsKeys } from "@/config/query-keys";
import { addDocs, heartbeatFn, searchDocs } from "@/services/docs";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useHeartbeat() {
  return useQuery({
    queryKey: ["heartbeat"],
    queryFn: heartbeatFn,
    enabled: false,
  });
}

export function useAddDocs() {
  return useMutation({
    mutationFn: addDocs,
  });
}

export function useSearchDocs() {
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";

  return useQuery({
    queryKey: docsKeys.filter(query),
    queryFn: () => searchDocs(query),
    enabled: !!query,
  });
}
