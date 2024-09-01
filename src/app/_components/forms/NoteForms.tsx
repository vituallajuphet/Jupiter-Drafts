'use client'

import { api } from "~/trpc/react";
import { NoteLists } from "../notes/NoteLists"
import RTEEditor from "../RTEditor"

const NotesForms = () => {
    const [notes, {
        refetch
    }] = api.notes.getallNotes.useSuspenseQuery();


    const handleSave = async () => {
        await refetch();
    }
    const removeNote = api.notes.deleteNote.useMutation({
        onSuccess: async () => {
            await refetch();
        }
    });
    return (
        <>
            <div className="max-w-[600px] w-full">
                <RTEEditor onSave={async () => {
                    await handleSave()
                }} />
            </div>
            <NoteLists notes={notes} onRemove={(id: number) => {
                removeNote.mutate({
                    id
                })
            }} />
        </>
    )
}

export default NotesForms