import { Card } from "../ui/Card";
import { CreateNoteWidget } from "./CreateNoteWidget";

export const CreateNoteCard: React.FC = () => {
    return (
        <Card>
            <div className="bg-green-300">
                <CreateNoteWidget />
            </div>
        </Card>
    );
}