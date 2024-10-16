import Link from "next/link";

import { api, HydrateClient } from "~/trpc/server";
import NotesForms from "./_components/forms/NoteForms";
import SideBar from "./_components/Aside";
import { iconsList } from "./_components/icons/data";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  void api.notes.getAllNotes.prefetch();
  void api.tags.getAllTags.prefetch();
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <div>
        <div className="flex min-h-screen flex-col bg-slate-100 text-slate-200 lg:flex-row dark:bg-slate-700">
          <SideBar session={session} />
          <main className="flex w-full flex-col items-center bg-slate-600 p-4 py-12">
            {session ? (
              <NotesForms />
            ) : (
              <div className="text-4xl h-full w-full flex items-center justify-center "><h2>Sign In to Start Drafting...</h2></div>
            )}
          </main>
        </div>
      </div>
    </HydrateClient>
  );
}
