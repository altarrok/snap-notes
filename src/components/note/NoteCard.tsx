import { Card } from "../ui/Card";

export const NoteCard: React.FC<{ title: string, content: string }> = ({ title, content }) => {
    return (
        <Card>
            <div className="flex flex-col">
                <h2 className="text-5xl text-center font-bold border-b border-b-solid border-b-gray-200 p-4 break-words">
                    {title}
                </h2>
                <p className="text-base p-4 break-words">
                    {content}
                </p>
            </div>
        </Card>
    );
}