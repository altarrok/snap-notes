import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { MdEditNote, MdDelete } from "react-icons/md";

export const NoteMenu: React.FC<{ onEdit: () => void, onDelete: () => void }> = ({ onEdit, onDelete }) => {
    return (
        <Menu
            menuButton={<MenuButton className="text-2xl after:content-['\2807'] pl-3 pr-2 py-2 transition-colors hover:text-pink-400" />}
            align="end"
            direction="bottom"
            menuClassName="bg-gray-300 rounded-md text-base font-bold max-w-sm border border-solid border-gray-400"
        >
            <MenuItem onClick={() => onEdit()} className="py-2 px-2 cursor-pointer hover:bg-gray-200 transition-colors rounded-md">
                <span className="flex items-center">
                    <MdEditNote className="text-4xl pr-2" /> Edit
                </span>
            </MenuItem>
            <MenuItem onClick={() => onDelete()} className="py-2 px-2 cursor-pointer hover:bg-gray-200 transition-colors rounded-md">
                <span className="flex items-center hover:text-red-500 transition-colors">
                    <MdDelete className="text-4xl pr-2" /> Delete
                </span>
            </MenuItem>
        </Menu>
    );
}