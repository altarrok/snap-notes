import { useState } from "react";
import { Listbox } from '@headlessui/react'
import { MdExpandMore, MdTag } from "react-icons/md";
import React from "react";

export const TagFilter: React.FC<{
    tags: string[],
    selectedTags: string[],
    onChange: (selectedTags: string[]) => void,
}> = ({ tags, selectedTags, onChange }) => {

    return (
        <div className="relative">
            <Listbox value={selectedTags} onChange={onChange} multiple>
                <Listbox.Button>
                    <span className="text-2xl p-2 flex items-center border border-solid border-gray-400 rounded-md">
                        <MdTag />
                        <MdExpandMore />
                    </span>
                </Listbox.Button>
                <Listbox.Options className="absolute right-0 z-10 bg-white border border-solid border-gray-300 mt-1 p-2 rounded-md max-h-96 max-w-lg overflow-y-auto text-right">
                    {tags.map((tag, i) => (
                        <Listbox.Option
                            key={i}
                            value={tag}
                            as={React.Fragment}
                        >
                            {({ selected }) => (
                                <li
                                    title={tag}
                                    className={`min-w-max text-ellipsis overflow-x-hidden hover:bg-gray-200 transition-colors p-2 cursor-pointer rounded-md my-2 ${selected ? 'bg-green-300 hover:bg-green-200' : ''}`}
                                >
                                    {tag}
                                </li>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    );
}