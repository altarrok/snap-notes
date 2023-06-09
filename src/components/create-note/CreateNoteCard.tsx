import { Card } from "../ui/Card";
import { CreateNoteWidget } from "./CreateNoteWidget";

export const CreateNoteCard: React.FC = () => {
    return (
        <Card className="bg-green-300">
            <div className="h-full">
                <CreateNoteWidget />
            </div>
        </Card>
    );
}