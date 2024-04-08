import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DocsList({
  docs = [],
  isLoading,
}: {
  docs: any[];
  isLoading: boolean;
}) {
  if (isLoading) return <div className="">Loading...</div>;

  const docsList = docs.map((doc) => (
    <Dialog key={doc.title}>
      <DialogTrigger asChild>
        <Card key={doc.title}>
          <CardHeader>
            <CardTitle>{doc.title}</CardTitle>
            <CardDescription className="line-clamp-6">
              {doc.text}
            </CardDescription>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{doc.title}</DialogTitle>
        <DialogDescription className="text-base">{doc.text}</DialogDescription>
      </DialogContent>
    </Dialog>
  ));

  return <div className="grid grid-cols-3 gap-4">{docsList}</div>;
}
