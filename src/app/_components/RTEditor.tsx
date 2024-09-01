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
import { useMemo, useState } from 'react';
import FooterRTE from './plugins/FooterRTE';
import TreeViewPlugin from './plugins/Treeplugin';
import { saveNote } from './actions';
import { Input } from '@headlessui/react';
import clsx from 'clsx';
import SelectControl from './controls/Combobox';
import { api } from '~/trpc/react';

const placeholder = 'Enter some rich text...';

const editorConfig = {
    namespace: 'React.js Demo',
    nodes: [],
    // Handling of errors during update
    onError(error: Error) {
        throw error;
    },
    // The editor themetheme: lexicalConfig,
};

export default function RTEEditor({ onSave }) {
    const [editmode, setEditMode] = useState(false);
    const [theTitle, setTitle] = useState('');
    const [selected, setSelected] = useState<null | { name: string, id: number }>();

    const [tags, {
        refetch
    }] = api.tags.getAllTags.useSuspenseQuery();

    const tagOptions = useMemo(() => {
        return tags.map(tag => (
            {
                id: tag.id,
                name: tag.name || ''
            }
        ))

    }, [tags])

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
                <h2 className='text-slate-300 text-xs '>Title</h2>
                <Input type="text" value={theTitle} onChange={(e) => {
                    setTitle(e.target.value)
                }} className={clsx(
                    'mt-1 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                )} />
                <div className='mt-6'>
                    <h2 className='text-slate-300 mb-1 text-xs'>Category Label</h2>
                    <SelectControl options={tagOptions} onChange={(par) => {
                        setSelected(par)
                    }} />
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
                        {/* <TreeViewPlugin /> */}
                        <FooterRTE
                            onCancel={() => {
                                console.log("theTitletheTitle", theTitle)
                                setEditMode(false)
                            }}
                            title={theTitle}
                            onSave={async (data) => {


                                await saveNote({
                                    title: data.title,
                                    contents: data.html,
                                    root_contents: JSON.stringify(data.json),
                                    tag_id: selected?.id
                                });
                                onSave()
                                setEditMode(false)

                            }}
                        />
                    </div>
                </div>
            </LexicalComposer></>
    );
}
