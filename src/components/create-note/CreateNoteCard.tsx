import { Card } from "../ui/Card";
import { CreateNoteWidget } from "./CreateNoteWidget";

export const CreateNoteCard: React.FC = () => {
    return (
        <Card>
            <CreateNoteWidget />
        </Card>
    );
}