"use client";

import Link from "next/link";
import { useState } from "react";
import { api } from "~/trpc/react";

const SideBar = () => {
  const [tags, { refetch }] = api.tags.getAllTags.useSuspenseQuery();

  const [label, setLabel] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const utils = api.useUtils();
  const createPost = api.tags.create.useMutation({
    onSuccess: async () => {
      await utils.tags.invalidate();
      setLabel("");
      setOpenForm(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    createPost.mutate({ name: label });

    await refetch();
  };

  return (
    <aside className="w-[300px] p-4 py-6">
      <div className="flex justify-between">
        <h2 className="text-sm uppercase">Labels</h2>
        <button
          type="button"
          onClick={() => setOpenForm(!openForm)}
          className="h-6 w-6 rounded-full bg-slate-500"
        >
          <i className={openForm ? "fa fa-minus" : "fa fa-plus"}></i>
        </button>
      </div>
      {openForm ? (
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col items-end"
        >
          <input
            value={label}
            onChange={(e) => {
              setLabel(e.target.value);
            }}
            type="text"
            placeholder="Label Name"
            className="mt-4 w-full rounded-lg px-4 py-2 text-sm text-slate-900"
          />
          <button className="mt-2 rounded-md bg-green-600 p-1.5 px-4 text-xs text-white">
            Add
          </button>
        </form>
      ) : null}
      <div className="mt-4">
        <ul className="font-opensans text-sm">
          {tags.length ? (
            tags.map((tag) => {
              return (
                <li key={tag.id} className="py-2">
                  <Link
                    href={`/`}
                    className="flex items-center gap-x-2 text-xs"
                  >
                    <i className="fa fa-circle"></i> <span>{tag.name}</span>
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="text-xs">No labels found</li>
          )}
        </ul>
      </div>
      <hr className="mt-4" />
    </aside>
  );
};

export default SideBar;
