import { useContext } from "react";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { MdEditNote, MdDelete, MdShare, MdArchive, MdUnarchive } from "react-icons/md";
import { SignInOutModalContext } from "../auth/SignInOutModalContext";
import { useSession } from "next-auth/react";

export const NoteMenu: React.FC<{
    onEdit?: () => void,
    onDelete?: () => void,
    onShare?: () => void,
    onArchive?: () => void,
    onUnarchive?: () => void,
}> = ({ onEdit, onDelete, onShare, onArchive, onUnarchive }) => {
    const { setIsSignInOutModalOpen } = useContext(SignInOutModalContext);
    const { status } = useSession();
    
    return (
        <Menu
            menuButton={<MenuButton className="text-2xl after:content-['\2807'] pl-3 pr-2 py-2 transition-colors hover:text-pink-400" />}
            align="end"
            direction="bottom"
            menuClassName="bg-gray-300 rounded-md text-base font-bold max-w-sm border border-solid border-gray-400"
        >
            {onEdit && <MenuItem onClick={() => status !== "authenticated" ? setIsSignInOutModalOpen(true) : onEdit()} className="py-2 px-2 cursor-pointer hover:bg-gray-200 transition-colors rounded-t-md">
                <span className="flex items-center">
                    <MdEditNote className="text-4xl pr-2" /> Edit
                </span>
            </MenuItem>}
            {onShare && <MenuItem onClick={() => status !== "authenticated" ? setIsSignInOutModalOpen(true) : onShare()} className="py-2 px-2 cursor-pointer hover:bg-gray-200 transition-colors">
                <span className="flex items-center">
                    <MdShare className="text-4xl pr-2" /> Share
                </span>
            </MenuItem>}
            {onArchive && <MenuItem onClick={() => status !== "authenticated" ? setIsSignInOutModalOpen(true) : onArchive()} className="py-2 px-2 cursor-pointer hover:bg-gray-200 transition-colors">
                <span className="flex items-center">
                    <MdArchive className="text-4xl pr-2" /> Archive
                </span>
            </MenuItem>}
            {onUnarchive && <MenuItem onClick={() => status !== "authenticated" ? setIsSignInOutModalOpen(true) : onUnarchive()} className="py-2 px-2 cursor-pointer hover:bg-gray-200 transition-colors">
                <span className="flex items-center">
                    <MdUnarchive className="text-4xl pr-2" /> Unarchive
                </span>
            </MenuItem>}
            {onDelete && <MenuItem onClick={() => status !== "authenticated" ? setIsSignInOutModalOpen(true) : onDelete()} className="py-2 px-2 cursor-pointer hover:bg-gray-200 transition-colors rounded-b-md">
                <span className="flex items-center hover:text-red-500 transition-colors">
                    <MdDelete className="text-4xl pr-2" /> Delete
                </span>
            </MenuItem>}
        </Menu>
    );
}