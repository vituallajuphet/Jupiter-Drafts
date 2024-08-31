

import { api } from "~/trpc/server";
import parse from 'html-react-parser';


export const NoteLists = async () => {
    const notes = await api.notes.getallNotes();

    return (
        <div className="w-full">
            <h1 className="mb-4 dark:text-white text-slate-900">Notes</h1>
            {
                notes ? (
                    <ul className="grid grid-cols-4 gap-4">
                        {notes.map((note) => {
                            return (
                                <li key={note.id} className="bg-red-100 p-2 text-slate-700">
                                    <h2>{note.title}</h2>
                                    <div>
                                        {parse(note.contents)}
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