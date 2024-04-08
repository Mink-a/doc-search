import { Button } from "@/components/ui/button";
import { useHeartbeat } from "../queries";

export function TestHeartbeat() {
  const { data, refetch } = useHeartbeat();
  console.log(data?.data, "heartbeat");
  return <Button onClick={() => refetch()}>Test heartbeat</Button>;
}
