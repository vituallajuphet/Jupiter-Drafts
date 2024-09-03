import Link from "next/link";

import { api, HydrateClient } from "~/trpc/server";
import NotesForms from "./_components/forms/NoteForms";
import SideBar from "./_components/Aside";
import { iconsList } from "./_components/icons/data";

export default async function Home() {
  void api.notes.getAllNotes.prefetch();
  void api.tags.getAllTags.prefetch();

  return (
    <HydrateClient>
      <div>
        <div className="flex min-h-screen flex-col bg-slate-100 text-slate-200 lg:flex-row dark:bg-slate-700">
          <SideBar />
          <main className="flex w-full flex-col items-center bg-slate-600 p-4 py-12">
            <NotesForms />
          </main>
        </div>
      </div>
    </HydrateClient>
  );
}
