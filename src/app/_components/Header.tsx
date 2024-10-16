import Link from "next/link"
import { getServerAuthSession } from "~/server/auth";
import { Input } from '@headlessui/react'
import Image from "next/image";

export const Header = async () => {



    const session = await getServerAuthSession();

    return <header>
        <div className="dark:bg-slate-900 bg-white p-4 py-3 flex justify-between items-center">
            <div className="flex flex-col lg:flex-row items-center gap-4 flex-1">
                <h1 className="dark:text-white text-slate-900 font-extrabold min-w-[200px]">Jupiter Drafts</h1>
                <div className="w-full">
                    <form className="max-w-md">
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <Input type="search" id="default-search" className="block w-full p-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search your drafts here..." required />
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
                        <Link href={session ? '/api/auth/signout' : '/api/auth/signin'} className="flex flex-row items-center gap-x-2">

                          {session ? (<div>
                                <Image src={session.user.image ?? ''} alt={session.user.name} width={30} height={30} className="rounded-full" />
                          </div>) :   <i className="fa fa-user"></i>}
                            <span className="text-sm">{session ? 'Sign Out' : 'Sign In'}</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>

    </header>
}