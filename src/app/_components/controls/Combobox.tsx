import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";

type SelectControlTypes = {
  options: { id: number; name: string }[];
  onChange: (value: any) => void;
};

export default function SelectControl(props: SelectControlTypes) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const options =
    query === ""
      ? props.options
      : props.options?.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      value={selected}
      onChange={(value) => {
        setSelected(value);
        props.onChange(value);
      }}
      onClose={() => setQuery("")}
      __demoMode
    >
      <div className="relative">
        <ComboboxInput
          className={clsx(
            "w-full rounded-lg border-none bg-white/5 py-1.5 pl-3 pr-8 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
          )}
          displayValue={(person) => person?.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5"></ComboboxButton>
      </div>

      <ComboboxOptions
        anchor="bottom"
        transition
        className={clsx(
          "w-[var(--input-width)] rounded-xl border border-white/5 bg-slate-700 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
          "z-20 transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
        )}
      >
        {options?.map((person) => (
          <ComboboxOption
            key={person.id}
            value={person}
            className="group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
          >
            <div className="text-sm/6 text-white">{person.name}</div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
