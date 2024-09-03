import parse, { domToReact } from "html-react-parser";

// Helper function to parse Lexical JSON and extract text with new lines
export const extractTextFromLexicalJSON = (json) => {
  // This function assumes `json` is a format that includes nodes with type and content
  const processNode = (node) => {
    if (typeof node === "string") {
      return node;
    }

    if (Array.isArray(node)) {
      return node.map(processNode).join("\n");
    }

    if (node.type === "text") {
      return node.text;
    }

    if (node.type === "element") {
      let text = "";
      if (
        [
          "p",
          "div",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "li",
          "blockquote",
          "pre",
        ].includes(node.tag)
      ) {
        text += "\n"; // Add new line before block-level elements
      }
      text += node.children.map(processNode).join("");
      if (
        [
          "p",
          "div",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "li",
          "blockquote",
          "pre",
        ].includes(node.tag)
      ) {
        text += "\n"; // Add new line after block-level elements
      }
      return text;
    }

    return "";
  };

  return processNode(json);
};

export const removeHtml = (html: string) => {
  // Replace block-level tags with new lines
  let textWithNewLines = html.replace(
    /<\/(p|div|h[1-6]|li|blockquote|pre)>/gi,
    "\n",
  );
  textWithNewLines = textWithNewLines.replace(
    /<(p|div|h[1-6]|li|blockquote|pre)[^>]*>/gi,
    "\n",
  );

  // Remove all other HTML tags
  textWithNewLines = textWithNewLines.replace(/<\/?[^>]+>/g, "");

  // Normalize multiple new lines into a single new line
  textWithNewLines = textWithNewLines.replace(/\n+/g, "\n").trim();

  return textWithNewLines;
};

export const ellipsis = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
};
