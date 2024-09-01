'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'


type ActionMenuProps = {

    note: any
    onRemove: (id: number) => void
}

const ActionMenu = ({ note, onRemove }: ActionMenuProps) => {

    return <Menu>
        <MenuButton>
            <i className="fa fa-ellipsis-v"></i>
        </MenuButton>
        <MenuItems
            transition
            anchor="bottom end"
            className="w-36 origin-top-right rounded-xl border border-white/5 dark:bg-slate-600 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
            <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <span className='text-xs'><i className='fa fa-pen'></i></span> Edit
                </button>
            </MenuItem>
            <div className="my-1 h-px bg-white/5" />
            <MenuItem>
                <button
                    onClick={() => {
                        onRemove(note.id)
                    }}
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <span className='text-xs'><i className='fa fa-trash'></i></span> Delete
                </button>
            </MenuItem>
        </MenuItems>
    </Menu>
}

export default ActionMenu;