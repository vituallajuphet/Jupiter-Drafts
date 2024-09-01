'use client'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React, { useCallback } from 'react';
import { $generateHtmlFromNodes } from '@lexical/html'

type footerProps = {
    onCancel: () => void;
    title: string;
    onSave: (data: {
        html: string;
        json: any
        title: string
    }) => void;

};


function FooterRTE({
    onCancel,
    title,
    onSave
}: footerProps) {
    const [editor] = useLexicalComposerContext();

    const handleGetHTML = useCallback(() => {
        editor.getEditorState().read(() => {

            const html = $generateHtmlFromNodes(editor);
            onSave({ html: html, json: editor.getEditorState().toJSON(), title: title });
            // const htmlContent = convertEditorStateToHTML(editor.getEditorState());
            // console.log('HTML Content:', htmlContent);
        });
    }, [editor, title]);

    return <div className='p-2 flex justify-end border-t border-slate-200 gap-x-3'>
        <button onClick={onCancel} className='bg-red-400 text-white rounded-md p-2 px-4 text-sm'>Cancel</button>
        <button onClick={handleGetHTML} className='bg-green-700 text-white rounded-md p-2 px-4 text-sm'>Save Changes</button>
    </div>;
}

export default FooterRTE;