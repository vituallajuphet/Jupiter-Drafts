    'use server'

import { api } from "~/trpc/server";



export const DeleteNote = async  (id: number) => { 
    await  api.notes.deleteNote({id: id });

    // Add any additional code here if needed
}