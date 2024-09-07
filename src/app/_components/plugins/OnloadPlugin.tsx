import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorState } from "lexical";
import { useEffect } from "react";
export const OnloadPlugin = ({ data }) => {
  const [editor] = useLexicalComposerContext();
  console.log("data", data);

  useEffect(() => {
    if (!data) return;
    const init = editor.parseEditorState(data);
    editor.setEditorState(init);
  }, [editor, data]);

  return null;
};
