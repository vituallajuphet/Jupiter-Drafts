"use client";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { lexicalConfig } from "./config";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import "~/styles/lexical.css";
import { useEffect, useMemo, useState } from "react";
import FooterRTE from "./plugins/FooterRTE";
import TreeViewPlugin from "./plugins/Treeplugin";
import { saveNote } from "./actions";
import { Input } from "@headlessui/react";
import clsx from "clsx";
import SelectControl from "./controls/Combobox";
import { api } from "~/trpc/react";
import { set } from "zod";
import { EditorState } from "lexical";
import { MyOnChangePlugin } from "./plugins/EditorChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OnloadPlugin } from "./plugins/OnloadPlugin";

const placeholder = "Enter some rich text...";

const editorConfig = {
  namespace: "React.js Demo",
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor themetheme: lexicalConfig,
};

type RTEEditorProps = {
  onSave: () => void;
  openEditor?: boolean;
  onClickEditor?: () => void;
  onCancel?: () => void;
  theTitle: string;
  onChangeTitle: (title: string) => void;
  onloadData?: any;
  selected?: null | {
    name: string;
    id: number;
  };
  onChangeSelected: (selected: null | { name: string; id: number }) => void;
  editorState: EditorState;
  onChangeEditorState: (editorState: EditorState) => void;
};

export default function RTEEditor({
  theTitle,
  onSave,
  openEditor,
  onClickEditor,
  onCancel,
  onChangeTitle,
  selected,
  onChangeSelected,
  editorState,
  onloadData,
  onChangeEditorState,
}: RTEEditorProps) {
  const [tags, { refetch }] = api.tags.getAllTags.useSuspenseQuery();

  const tagOptions = useMemo(() => {
    return tags.map((tag) => ({
      id: tag.id,
      name: tag.name || "",
    }));
  }, [tags]);

  console.log("onloadData", onloadData);

  if (!openEditor) {
    return (
      <div className="flex">
        <div className="relative w-full max-w-[500px] rounded-md bg-slate-600 shadow-lg shadow-slate-600">
          <button
            onClick={() => {
              if (onClickEditor) {
                onClickEditor();
              }
            }}
            className="h-10 w-full rounded-md bg-slate-500 p-2 px-4 text-left"
          >
            <span className="text-white">Take a note...</span>
          </button>
          <span className="absolute right-3 top-2">
            <i className="fa fa-pen"></i>
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="text-xs text-slate-300">Title</h2>
        <Input
          type="text"
          value={theTitle}
          onChange={(e) => {
            onChangeTitle(e.target.value);
          }}
          className={clsx(
            "mt-1 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
          )}
        />
        <div className="mt-6">
          <h2 className="mb-1 text-xs text-slate-300">Category Label</h2>
          <SelectControl
            options={tagOptions}
            onChange={(par) => {
              onChangeSelected(par);
            }}
          />
        </div>
      </div>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          {/* <ColorPickerPlugin /> */}
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="editor-input"
                  aria-placeholder={placeholder}
                  placeholder={
                    <div className="editor-placeholder">{placeholder}</div>
                  }
                />
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <MyOnChangePlugin onChange={onChangeEditorState} />
            <TreeViewPlugin />
            <OnloadPlugin data={onloadData} />
            <FooterRTE
              onCancel={() => {
                if (onCancel) {
                  onCancel();
                }
              }}
              title={theTitle}
              onSave={async (data) => {
                if (selected?.id) {
                  await saveNote({
                    title: data.title,
                    contents: data.html,
                    root_contents: JSON.stringify(data.json),
                    tag_id: selected?.id,
                  });
                  onSave();

                  onChangeTitle("");
                  onChangeSelected(null);
                }
              }}
            />
          </div>
        </div>
      </LexicalComposer>
    </>
  );
}
