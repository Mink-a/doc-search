import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  query: z.string().min(0).max(50),
});

export function DocsSearch({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const queryParams = new URLSearchParams(location.search);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: queryParams.get("q") || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { query } = values;
    queryParams.set("q", query);
    window.history.replaceState(null, "", `?${queryParams.toString()}`);
    onSearch(query);
  }

  return (
    <Form {...form}>
      <form
        id="docsSearchForm"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex space-x-2"
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Search" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" form="docsSearchForm" variant="outline">
          Search
        </Button>
      </form>
    </Form>
  );
}
