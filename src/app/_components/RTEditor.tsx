'use client'

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { lexicalConfig } from './config';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import '~/styles/lexical.css';
import { useState } from 'react';
import FooterRTE from './plugins/FooterRTE';
import TreeViewPlugin from './plugins/Treeplugin';
import { saveNote } from './actions';

const placeholder = 'Enter some rich text...';

const editorConfig = {
    namespace: 'React.js Demo',
    nodes: [],
    // Handling of errors during update
    onError(error: Error) {
        throw error;
    },
    // The editor theme
    theme: lexicalConfig,
};

export default function RTEEditor() {
    const [editmode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');

    if (!editmode) {
        return (
            <div className='flex'>
                <div className='bg-slate-600 shadow-slate-600 shadow-lg relative w-full max-w-[500px] rounded-md'>
                    <button
                        onClick={() => {
                            setEditMode(true)
                        }}
                        className='p-2 bg-slate-500 w-full rounded-md h-10 text-left px-4'>
                        <span className='text-white'>Take a note...</span>
                    </button>
                    <span className='absolute right-3 top-2'><i className='fa fa-pen'></i></span>

                </div>
            </div>
        )
    }

    return (
        <>
            <div className="mb-4">
                <h2>Title</h2>
                <input type="text" value={title} onChange={(e) => {
                    setTitle(e.target.value)
                }} className="w-full p-2 py-1.5 mt-2 bg-slate-500 text-slate-200 rounded-md" />
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
                        {/* <TreeViewPlugin /> */}
                        <FooterRTE onCancel={() => {
                            setEditMode(false)
                        }}
                            onSave={async (data) => {
                                await saveNote({
                                    title: title,
                                    contents: data
                                });
                                setEditMode(false)
                            }}
                        />
                    </div>
                </div>
            </LexicalComposer></>
    );
}
