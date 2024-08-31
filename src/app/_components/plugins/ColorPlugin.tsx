import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR, createCommand, } from "lexical";

// Define a new command for setting text color
const SET_TEXT_COLOR_COMMAND = createCommand();

const ColorPickerPlugin = () => {
    const [editor] = useLexicalComposerContext();
    const [color, setColor] = useState("#000000");
    const [isPickerVisible, setIsPickerVisible] = useState(false);

    // Update the color picker state
    const handleColorChange = (newColor) => {
        setColor(newColor);
        editor.dispatchCommand(SET_TEXT_COLOR_COMMAND, newColor);
    };

    // Register the custom command to change text color
    editor.registerCommand(
        SET_TEXT_COLOR_COMMAND,
        (newColor) => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                // Apply the selected color to the text
                selection.formatText("color", newColor);
            }
            return true;
        },
        COMMAND_PRIORITY_EDITOR
    );

    return (
        <div className="color-picker-plugin">
            <button
                onClick={() => setIsPickerVisible((prev) => !prev)}
                style={{ backgroundColor: color }}
                className="color-picker-button"
            >
                Text Color
            </button>
            {isPickerVisible && (
                <HexColorPicker color={color} onChange={handleColorChange} />
            )}
        </div>
    );
};

export default ColorPickerPlugin;
