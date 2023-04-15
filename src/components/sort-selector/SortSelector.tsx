import { Listbox } from '@headlessui/react'
import { MdExpandMore, MdSort } from "react-icons/md";
import React, { useContext, useMemo } from "react";
import { NotebookContext } from '../notebook/NotebookContext';

export const SortSelector: React.FC = () => {
    const { setNotebookContextState } = useContext(NotebookContext);

    const sortOptions: {
        label: string,
        option: "TITLE" | "DATE",
    }[] = useMemo(() => {
        return [
            {
                label: "By Date",
                option: "DATE"
            },
            {
                label: "By Title",
                option: "TITLE"
            }
        ]
    }, [])

    return (
        <div className="relative">
            <Listbox
                defaultValue={sortOptions[0]}
                onChange={(sortOption) => setNotebookContextState((prevState) => ({ ...prevState, sortBy: sortOption.option }))}
            >
                <Listbox.Button>
                    <span className="text-2xl p-2 flex items-center border border-solid border-gray-400 rounded-md">
                        <MdSort />
                        <MdExpandMore />
                    </span>
                </Listbox.Button>
                <Listbox.Options className="absolute right-0 z-10 bg-white border border-solid border-gray-300 mt-1 p-2 rounded-md max-h-96 max-w-lg overflow-y-auto text-right">
                    {sortOptions.map((sortOption, i) => (
                        <Listbox.Option
                            key={i}
                            value={sortOption}
                            as={React.Fragment}
                        >
                            {({ selected }) => (
                                <li
                                    title={sortOption.label}
                                    className={`min-w-max text-ellipsis overflow-x-hidden hover:bg-gray-200 transition-colors p-2 cursor-pointer rounded-md my-2 ${selected && 'bg-green-300 hover:bg-green-200'}`}
                                >
                                    {sortOption.label}
                                </li>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    );
}