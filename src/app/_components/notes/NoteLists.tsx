'use client'

import { api } from "~/trpc/react";
import parse from 'html-react-parser';
import moment from 'moment';
import ActionMenu from "./ActionMenu";


const getRandomTailwindColor = () => {
    const colors = [
        'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink', 'gray',
        'orange', 'teal', 'cyan', 'rose', 'lime', 'emerald', 'violet', 'fuchsia', 'amber'
    ];

    const shades = ['50', '100', '200', '300',];

    // Randomly select a color and a shade
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomShade = shades[Math.floor(Math.random() * shades.length)];
    return `bg-${randomColor}-${randomShade}`;
}


type NoteListsProps = {
    notes: any[];
    onRemove: (id: number) => void;
}

export const NoteLists = ({ notes, onRemove }: NoteListsProps) => {




    return (
        <div className="w-full">
            <h1 className="mb-4 dark:text-white text-slate-900">Notes</h1>
            {
                notes ? (
                    <ul className="grid grid-cols-4 gap-4 ">
                        {notes.map((note) => {
                            return (
                                <li key={note.id} className={`p-2 text-slate-700 min-h-[200px]  rounded-lg ${getRandomTailwindColor()} relative`}>
                                    <div className="absolute right-4 top-2 z-20">
                                        <ActionMenu note={note} onRemove={async (id: number) => {
                                            onRemove(id)
                                        }} />
                                    </div>
                                    <div className="flex flex-col justify-between h-full">
                                        <div>
                                            <h2 className="text-lg font-semibold">{note.title}</h2>
                                            <div className="text-sm">
                                                {parse(note.contents)}
                                            </div>
                                        </div>
                                        <div className="text-xs ">
                                            {moment(note.createdAt).format('MMM DD, YYYY')}
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                ) : (
                    <p>No notes yet.</p>
                )
            }
        </div>
    )
}