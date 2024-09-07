"use client";

import { api } from "~/trpc/react";

import moment from "moment";
import ActionMenu from "./ActionMenu";
import { ellipsis, extractTextFromLexicalJSON, removeHtml } from "../helper";

const getbgColor = (i) => {
  const colors = [
    "red",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple",
    "pink",
    "gray",
    "orange",
    "teal",
    "cyan",
    "rose",
    "lime",
    "emerald",
    "violet",
    "fuchsia",
    "amber",
  ];

  return `bg-${colors[i % colors.length]}-100`;
};

type NoteListsProps = {
  notes: any[];
  onRemove: (id: number) => void;
  onEdit: (id: number) => void;
};

export const NoteLists = ({ notes, onRemove, onEdit }: NoteListsProps) => {
  return (
    <div className="w-full">
      <h1 className="mb-4 text-slate-900 dark:text-white">Drafts</h1>
      {notes ? (
        <ul className="grid grid-cols-4 gap-4">
          {notes.map((note, i) => {
            const contentText = extractTextFromLexicalJSON(note.contents);

            return (
              <li
                key={note.id}
                className={`min-h-[200px] rounded-lg p-2 text-slate-700 ${getbgColor(i)} relative`}
              >
                <div className="absolute right-4 top-2 z-20">
                  <ActionMenu
                    note={note}
                    onRemove={async (id: number) => {
                      onRemove(id);
                    }}
                    onEdit={(id) => {
                      onEdit(id);
                    }}
                  />
                </div>
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <h2 className="mb-2 text-lg font-semibold">
                      {ellipsis(note.title, 16)}
                    </h2>
                    <div className="text-sm italic">
                      {ellipsis(removeHtml(contentText), 160)}
                    </div>
                  </div>
                  <div className="text-xs">
                    {moment(note.createdAt).format("MMM DD, YYYY")}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No notes yet.</p>
      )}
    </div>
  );
};
