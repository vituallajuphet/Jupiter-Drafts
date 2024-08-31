'use server'

import { api } from "~/trpc/server";
import { useRouter } from 'next/router';
import { redirect } from "next/navigation";



export const saveNote = async (note: {
    title: string,
    contents: string
} ) => { 
    api.notes.create({
        title: note.title,
        contents: note.contents
    });

    redirect('/');

    // Add any additional code here if needed
}