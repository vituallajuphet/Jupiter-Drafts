'use client'

import Link from "next/link"
import { useState } from "react";
import { api } from "~/trpc/react";

const SideBar = () => {
    const [tags, {
        refetch
    }] = api.tags.getAllTags.useSuspenseQuery();

    const [label, setLabel] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const utils = api.useUtils();
    const createPost = api.tags.create.useMutation({
        onSuccess: async () => {
            await utils.tags.invalidate();
            setLabel('');
            setOpenForm(false)
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        createPost.mutate({ name: label });

        await refetch();
    }

    return (
        <aside className="w-[300px] p-4 py-6">
            <div className="flex justify-between">
                <h2 className="text-sm uppercase">Labels</h2>
                <button type="button"
                    onClick={() => setOpenForm(!openForm)}
                    className="rounded-full w-6 h-6 bg-slate-500">
                    <i className={openForm ? 'fa fa-minus' : 'fa fa-plus'}></i>
                </button>
            </div>
            {
                openForm ? <form action="" onSubmit={handleSubmit} className="flex-col items-end flex">
                    <input value={label} onChange={(e) => {
                        setLabel(e.target.value)
                    }} type="text" placeholder="Label Name" className="w-full mt-4 px-4 py-2 rounded-lg text-sm text-slate-900" />
                    <button className="bg-green-600 mt-2 text-white text-xs p-1.5 px-4 rounded-md">Add</button>
                </form> : null
            }
            <div className="mt-4">
                <ul className="font-opensans text-sm">

                    {
                        tags.length ? tags.map((tag) => {
                            return (
                                <li key={tag.id} className="py-2">
                                    <Link href={`/`} className="text-xs flex items-center gap-x-2">
                                        <i className="fa fa-code"></i> <span>{tag.name}</span>
                                    </Link>
                                </li>
                            )
                        }) : (
                            <li className="text-xs">
                                No labels found
                            </li>
                        )
                    }

                </ul>
            </div>
            <hr className="mt-4" />
        </aside>
    )
}

export default SideBar;