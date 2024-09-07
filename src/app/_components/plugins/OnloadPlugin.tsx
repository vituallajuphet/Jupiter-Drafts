import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorState } from "lexical";
import { useEffect } from "react";
export const OnloadPlugin = ({ data }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!data) return;
    const init = editor.parseEditorState(
      JSON.parse(data?.root_contents as any),
    );
    editor.setEditorState(init);
  }, [editor, data]);

  return null;
};
