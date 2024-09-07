"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useCallback } from "react";
import { $generateHtmlFromNodes } from "@lexical/html";

type footerProps = {
  onCancel: () => void;
  title: string;
  onSave: (data: { html: string; json: any; title: string }) => void;
};

function FooterRTE({ onCancel, title, onSave }: footerProps) {
  const [editor] = useLexicalComposerContext();

  const handleGetHTML = useCallback(() => {
    editor.getEditorState().read(() => {
      const html = $generateHtmlFromNodes(editor);
      onSave({
        html: html,
        json: editor.getEditorState().toJSON(),
        title: title,
      });
      // const htmlContent = convertEditorStateToHTML(editor.getEditorState());
      // console.log('HTML Content:', htmlContent);
    });
  }, [editor, title]);

  return (
    <div className="flex justify-end gap-x-3 border-t border-slate-200 p-2">
      <button
        onClick={onCancel}
        className="rounded-md bg-red-400 p-2 px-4 text-sm text-white"
      >
        Cancel
      </button>
      <button
        onClick={handleGetHTML}
        className="rounded-md bg-green-700 p-2 px-4 text-sm text-white"
      >
        Save Changes
      </button>
    </div>
  );
}

export default FooterRTE;
