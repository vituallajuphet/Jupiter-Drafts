import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import RTEEditor from "./_components/RTEditor";
import { NoteLists } from "./_components/notes/NoteLists";

export default async function Home() {
  const session = await getServerAuthSession();


  void api.notes.getallNotes.prefetch();

  return (
    <HydrateClient>
      <div>
        <header>
          <div className="dark:bg-slate-900 bg-white p-4 py-3 flex justify-between items-center">
            <div className="flex flex-col lg:flex-row items-center gap-4 flex-1">
              <h1 className="dark:text-white text-slate-900 font-extrabold min-w-[150px]">Jupi Drafts</h1>
              <div className="w-full">
                <form className="max-w-md">
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search your drafts here..." required />
                  </div>
                </form>

              </div>
            </div>
            <nav className="dark:text-white text-slate-900">
              <ul className="flex items-center gap-4 text-lg">
                <li>
                  <Link href="/" >
                    <i className="fa fa-list"></i>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <i className="fa fa-table"></i>
                  </Link>
                </li>
                <li className="ml-8 ">
                  <Link href="/api/auth/signin" className="flex gap-x-2">

                    <i className="fa fa-user"></i>
                    <span className="text-sm">{session ? 'Sign Out' : 'Sign In'}</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

        </header>


        <div className="h-screen dark:bg-slate-700 bg-slate-100 text-slate-200 flex flex-col lg:flex-row">
          <aside className="w-[300px] p-4 py-6">
            <h2 className="text-sm uppercase">Labels</h2>
            <div className="mt-4">
              <ul className="font-opensans text-sm">
                <li>
                  <Link href={'/'} className="flex gap-x-4 items-center p-1.5 px-0 font-bold font-opensans">
                    <span className="w-6"><i className="fa fa-lightbulb"></i></span>
                    <span>Business Notes</span></Link>
                </li>
                <li>
                  <Link href={'/'} className="flex gap-x-4 items-center p-1.5  px-0 font-bold font-opensans">
                    <span className="w-6"><i className="fa fa-code"></i></span>
                    <span>Programming</span></Link>
                </li>
                <li>
                  <Link href={'/'} className="flex gap-x-4 items-center p-1.5  px-0 font-bold font-opensans">
                    <span className="w-6"><i className="fa fa-lock"></i></span>
                    <span>Credentials</span></Link>
                </li>
              </ul>
            </div>
            <hr className="mt-4" />
          </aside>
          <main className="w-full bg-slate-600 p-4 py-12 flex flex-col items-center">
            <div className="max-w-[600px] w-full">
              <RTEEditor />
            </div>
            <NoteLists />
          </main>
        </div>

      </div>


    </HydrateClient>
  );
}
