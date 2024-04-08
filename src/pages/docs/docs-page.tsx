import { useState } from "react";
import { AddFormModal, DocsSearch } from "./components";
import { useSearchDocs } from "./queries";
import { DocsList } from "./components";

export function DocsPage() {
  const { data, isLoading } = useSearchDocs();
  const [, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Similarity Search
      </h2>
      <div className="flex space-x-2">
        <DocsSearch onSearch={handleSearch} />
        <AddFormModal />
      </div>
      <DocsList docs={data?.data.metadatas[0]} isLoading={isLoading} />
    </div>
  );
}
