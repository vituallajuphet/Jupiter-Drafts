import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorState } from "lexical";
import { useEffect } from "react";
export const MyOnChangePlugin = ({ onChange }) => {
  const [editor] = useLexicalComposerContext();

  console.log("editor", editor);
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
};
