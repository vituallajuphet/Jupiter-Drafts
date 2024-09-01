import Link from "next/link";


import { api, HydrateClient } from "~/trpc/server";
import NotesForms from "./_components/forms/NoteForms";
import SideBar from "./_components/Aside";
import { iconsList } from "./_components/icons/data";

export default async function Home() {



  void api.notes.getallNotes.prefetch();
  void api.tags.getAllTags.prefetch();



  return (
    <HydrateClient>
      <div>
        <div className="min-h-screen dark:bg-slate-700 bg-slate-100 text-slate-200 flex flex-col lg:flex-row">
          <SideBar />
          <main className="w-full bg-slate-600 p-4 py-12 flex flex-col items-center">
            <NotesForms />
          </main>
        </div>

      </div>


    </HydrateClient>
  );
}
