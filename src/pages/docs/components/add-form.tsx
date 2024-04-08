import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddDocs } from "../queries";
import { LoadingButton } from "@/components/ui/loading-button";

const formSchema = z.object({
  title: z.string().min(2),
  text: z.string().min(2),
});

export function AddForm({ setOpen }: { setOpen: (open: boolean) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      text: "",
    },
  });

  const { mutateAsync, isPending } = useAddDocs();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const promise = mutateAsync(values);
    toast.promise(promise, {
      loading: "Adding document to the vector",
      success: () => {
        setOpen(false);
        return "Document has been added to the vector";
      },
      error: "Error",
    });
  }

  return (
    <Form {...form}>
      <form
        id="addForm"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Enter content"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton type="submit" form="addForm" loading={isPending}>
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
}
