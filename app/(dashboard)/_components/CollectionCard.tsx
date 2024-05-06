"use client";

import { deleteCollection } from "@/actions/collection";
import PlusIcon from "@/components/icons/PlusIcon";
import { AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Collection } from "@prisma/client";
import { CaretDownIcon, CaretUpIcon, TrashIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";

interface Props {
  collection: Collection;
}

const tasks: string[] = ["Task 1", "Task 2"];

export default function CollectionCard({ collection }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const removeCollection = async () => {
    try {
      await deleteCollection(collection.id);
      toast({
        title: "Success",
        description: "Collection deleted successfully!",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Cannot delete collection!",
        variant: "destructive",
      });
    }
  };

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex w-full justify-between p-6",
            open && "rounded-b-none",
            CollectionColors[collection.color as CollectionColor]
          )}
        >
          <span className="text-white font-bold">{collection.name}</span>
          {open ? (
            <CaretDownIcon className="h-6 w-6" />
          ) : (
            <CaretUpIcon className="h-6 w-6" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex rounded-md flex-col dark:bg-neutral-900 shadow-lg">
        {tasks.length === 0 && <div>No tasks</div>}
        {tasks.length > 0 && (
          <>
            <Progress className="rounded-none" value={45} />
            <div className="p-4 gap-3 flex flex-col">
              {tasks.map((task) => (
                <div key={task}>Mocked task</div>
              ))}
            </div>
          </>
        )}
        <Separator />
        <footer className="h-10 px-4 p-0.5 text-xs text-neutral-500 flex justify-between items-center">
          <p>Created at {collection.createdAt.toLocaleDateString("en-US")}</p>
          {isLoading ? (
            <div>Deleting...</div>
          ) : (
            <div>
              <Button size="icon" variant="ghost">
                <PlusIcon />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <TrashIcon />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDescription>
                    This action cannot be undone. This will permanently delete
                    your collection and all tasks inside it.
                  </AlertDescription>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        startTransition(removeCollection);
                      }}
                    >
                      Proceed
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </footer>
      </CollapsibleContent>
    </Collapsible>
  );
}
