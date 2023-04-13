import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import { MdArchive, MdNotes } from "react-icons/md";
import { NotePage } from "./NotePage";

export const Notebook: React.FC = () => {

    return (
        <Tab.Group>
            <Tab.List className="flex items-center">
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button
                            className={`text-2xl flex items-center gap-2 p-2 transition-colors ${selected && 'bg-blue-200'}`}
                        >
                            <MdNotes /> Notes
                        </button>
                    )}
                </Tab>
                <Tab as={Fragment}>

                    {({ selected }) => (
                        <button
                            className={`text-2xl flex items-center gap-2 p-2 transition-colors ${selected && 'bg-blue-200'}`}
                        >
                            <MdArchive /> Archived
                        </button>
                    )}
                </Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel>
                    <NotePage />
                </Tab.Panel>
                <Tab.Panel>
                    <NotePage archive/>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
}