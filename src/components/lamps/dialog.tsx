import { Plus } from "lucide-react";
import * as React from "react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import LampCreateForm from "./form";

export default function LampCreateDialog() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full h-[23vh] rounded-lg border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-colors group"
                >
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
              Add a lamp
            </span>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle className="text-2xl font-semibold text-center mb-6">Add a New Lamp</DialogTitle>
                <LampCreateForm setIsOpen={setIsOpen} />
            </DialogContent>
        </Dialog>
    );
}
