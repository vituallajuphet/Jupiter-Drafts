"use server";

import { api } from "~/trpc/server";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";

export const saveNote = async (note: {
  title: string;
  contents: string;
  root_contents: string;
  tag_id: number;
}) => {
  await api.notes.create({
    title: note.title,
    contents: note.contents,
    root_contents: note.root_contents,
    tag_id: note?.tag_id,
  });

  redirect("/");

  // Add any additional code here if needed
};

export const updateNote = async (note: {
  title: string;
  contents: string;
  root_contents: string;
  tag_id: number;
  note_id: number;
}) => {
  await api.notes.update({
    id: note.note_id,
    title: note.title,
    contents: note.contents,
    root_contents: note.root_contents,
    tag_id: note?.tag_id,
    note_id: note.note_id,
  });
  redirect("/");

  // Add any additional code here if needed
};
