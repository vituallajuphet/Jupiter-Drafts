"use client";

import { api } from "~/trpc/react";
import { NoteLists } from "../notes/NoteLists";
import RTEEditor from "../RTEditor";
import { useState } from "react";
import { title } from "process";
import { EditorState } from "lexical";

const NotesForms = () => {
  const [notes, { refetch }] = api.notes.getAllNotes.useSuspenseQuery();
  const [openEditor, setOpenEditor] = useState(false);
  const [selectedData, setSelectedData] = useState<any>();

  const [editorState, setEditorState] = useState<EditorState>();
  const handleEditorChange = (editorState: EditorState) => {
    console.log("editorState", editorState);
    setEditorState(editorState);
  };

  const [theTitle, setTitle] = useState("");
  const [selected, setSelected] = useState<null | {
    name: string;
    id: number;
  }>();

  const handleSave = async () => {
    await refetch();
  };
  const removeNote = api.notes.deleteNote.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });
  return (
    <>
      <div className="w-full max-w-[600px]">
        <RTEEditor
          onloadData={selectedData}
          editorState={editorState as EditorState}
          onChangeEditorState={handleEditorChange}
          onChangeSelected={(selected) => {
            console.log("selected", selected);
            setSelected(selected);
          }}
          selected={selected}
          theTitle={theTitle}
          onChangeTitle={(title) => {
            setTitle(title);
          }}
          onSave={async () => {
            await handleSave();
            setOpenEditor(false);
            setEditorState(undefined);
            setTitle("");
            setSelected(null);
            setSelectedData(null);
          }}
          onCancel={() => {
            setOpenEditor(false);
            setEditorState(undefined);
            setTitle("");
            setSelected(null);
            setSelectedData(null);
          }}
          openEditor={openEditor}
          onClickEditor={() => {
            setOpenEditor(true);
          }}
        />
      </div>
      <NoteLists
        onEdit={(id: number) => {
          setOpenEditor(true);
          const note = notes.find((note) => note.id === id);
          if (note) {
            // setEditorState(
            //   JSON.parse(note.root_contents as any) as EditorState,
            // );

            setSelectedData(note);
            setTitle(note.title as string);
            // @ts-ignore
            setSelected({ name: note?.tag?.name as string, id: note.tagID });
          }
        }}
        notes={notes}
        onRemove={(id: number) => {
          removeNote.mutate({
            id,
          });
        }}
      />
    </>
  );
};

export default NotesForms;
