import { useMemo, useState } from 'react'
import { Combobox } from '@headlessui/react'
import { Tag } from '../Tag'


export const AddTagInput: React.FC<{ tagOptions: string[], defaultValue?: string[] }> = ({ tagOptions, defaultValue }) => {
    const [selectedTags, setSelectedTags] = useState<string[]>(defaultValue || [])
    const [query, setQuery] = useState('')

    const filteredTagOptions = useMemo(() => {
        const lowerCaseSelectedTags = selectedTags.map(selectedTag => selectedTag.toLowerCase())
        const newFilteredTagOptions = tagOptions.filter(
            (tagOption) => (
                tagOption.toLowerCase().includes(query.toLowerCase()) &&
                !lowerCaseSelectedTags.includes(tagOption.toLowerCase())
            )
        );
        const lowerCaseNewFilteredTagOptions = newFilteredTagOptions.map(filteredTagOption => filteredTagOption.toLowerCase());

        if (query !== '' && !lowerCaseNewFilteredTagOptions.includes(query.toLowerCase()) && !lowerCaseSelectedTags.includes(query.toLowerCase())) {
            newFilteredTagOptions.unshift(query);
        }

        return newFilteredTagOptions;
    }, [tagOptions, selectedTags, query])

    return (
        <div className='relative'>
            <Combobox
                value={selectedTags}
                onChange={(tags) => {
                    setSelectedTags(tags);
                    setQuery('');
                }}
                name="note-tags"
                multiple
            >
                <Combobox.Label className="block font-medium text-gray-700">Tags:</Combobox.Label>
                {selectedTags.length > 0 && (
                    <div className='flex gap-2 flex-wrap p-2'>
                        {selectedTags.map((selectedTag, i) => (
                            <Tag
                                overflowHidden
                                key={i}
                                onDelete={() => setSelectedTags((prevSelectedTags) => prevSelectedTags.filter(prevSelectedTag => prevSelectedTag.toLowerCase() !== selectedTag.toLowerCase()))}
                            >
                                <span title={selectedTag}>{selectedTag}</span>
                            </Tag>
                        ))}
                    </div>
                )}
                <Combobox.Input
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
                    onChange={(event) => setQuery(event.target.value)}
                    value={query}
                />
                {
                    (filteredTagOptions.length > 0) && (
                        <Combobox.Options className="bg-white mt-1 rounded-md p-2 absolute z-10 w-full max-h-96 overflow-y-auto">
                            {filteredTagOptions.map((tagOption, i) => (
                                <Combobox.Option
                                    title={tagOption}
                                    key={i}
                                    value={tagOption}
                                    className={`cursor-pointer hover:bg-gray-200 py-2 px-4 rounded-xl overflow-x-hidden text-ellipsis ${query === tagOption && !tagOptions.includes(tagOption) && 'bg-green-200 hover:bg-green-100'}`}
                                >
                                    {tagOption}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    )
                }
            </Combobox>
        </div>
    );
}