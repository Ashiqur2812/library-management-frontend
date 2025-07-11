import { useState } from "react";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Check } from "lucide-react";
import { useCreateBorrowMutation } from "@/redux/api/borrowApi";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import type { IBook } from "types";

// Components
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";

interface BorrowDialogProps {
    book: IBook | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onComplete: () => void;
}

export default function BorrowDialog({
    book,
    open,
    onOpenChange,
    onComplete,
}: BorrowDialogProps) {
    const [quantity, setQuantity] = useState<number>(1);
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [createBorrow] = useCreateBorrowMutation();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!book || quantity < 1 || !dueDate) {
            toast.error("Please fill all fields correctly");
            return;
        }

        if (quantity > book.copies) {
            toast.error(`Only ${book.copies} copies available`);
            return;
        }

        try {
            setIsProcessing(true);
            await createBorrow({
                book: book._id,
                quantity,
                dueDate: dueDate.toISOString(),
            }).unwrap();

            // Show success state
            setIsSuccess(true);

            setTimeout(() => {
                onOpenChange(false);
                setQuantity(1);
                setDueDate(null);
                setIsProcessing(false);
                setIsSuccess(false);
                onComplete();
                navigate("/borrow-book");
            }, 1500);
        } catch (error) {
            // console.error(error);
            toast.error("Failed to borrow book.");
            setIsProcessing(false);
        }
    };

    const handleClose = () => {
        if (!isProcessing) {
            onOpenChange(false);
            setQuantity(1);
            setDueDate(null);
            setIsSuccess(false);
        }
    };

    // Calculate maximum available copies
    const maxQuantity = book ? Math.min(book.copies, 5) : 5;

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md rounded-2xl p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                {isSuccess ? (
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-4 mb-6">
                            <Check className="w-12 h-12 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-center mb-2 text-green-600 dark:text-green-400">
                            Borrow Successful!
                        </h3>
                        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                            You've borrowed {quantity} {quantity > 1 ? "copies" : "copy"} of
                            <span className="font-semibold"> "{book?.title}"</span>
                        </p>
                        <div className="mt-4 w-full">
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                                <span>Due Date</span>
                                <span className="font-medium">
                                    {dueDate ? format(dueDate, "MMM dd, yyyy") : "-"}
                                </span>
                            </div>
                            <Progress value={100} className="h-2 bg-gray-200 dark:bg-gray-700" />
                        </div>
                    </div>
                ) : (
                    <>
                        <DialogHeader>
                            <div className="flex items-start space-x-4">
                                {book?.image && (
                                    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="w-16 h-20 object-cover"
                                        />
                                    </div>
                                )}
                                <div>
                                    <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                                        Borrow "{book?.title}"
                                    </DialogTitle>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        by {book?.author}
                                    </p>
                                </div>
                            </div>
                        </DialogHeader>

                        <div className="space-y-6 mt-4">
                            {/* Quantity Selector */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="quantity" className="font-medium">
                                        Quantity
                                    </Label>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {book ? `${book.copies} available` : "Loading..."}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        disabled={quantity <= 1 || isProcessing}
                                        className="rounded-full w-10 h-10"
                                    >
                                        -
                                    </Button>

                                    <div className="flex-1 text-center">
                                        <span className="text-2xl font-bold">{quantity}</span>
                                        <span className="text-sm text-gray-500 ml-1">copies</span>
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setQuantity(q => Math.min(maxQuantity, q + 1))}
                                        disabled={quantity >= maxQuantity || isProcessing}
                                        className="rounded-full w-10 h-10"
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>

                            {/* Due Date Picker */}
                            <div className="space-y-3">
                                <Label className="font-medium">Due Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal h-14 px-4 rounded-xl",
                                                !dueDate && "text-gray-400 dark:text-gray-500"
                                            )}
                                            disabled={isProcessing}
                                        >
                                            <div className="bg-sky-100 dark:bg-sky-900/30 p-2 rounded-lg mr-3">
                                                <CalendarIcon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Select return date</p>
                                                {dueDate && (
                                                    <p className="text-base font-medium">
                                                        {format(dueDate, "MMM dd, yyyy")}
                                                    </p>
                                                )}
                                            </div>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 rounded-xl" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={dueDate ?? undefined}
                                            onSelect={(date: Date | undefined) => {
                                                if (date) setDueDate(date);
                                            }}
                                            initialFocus
                                            disabled={{ before: new Date() }}
                                            className="border-0"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Summary */}
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600 dark:text-gray-400">Borrowing</span>
                                    <span className="font-medium">
                                        {quantity} {quantity > 1 ? "copies" : "copy"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Return by</span>
                                    <span className="font-medium">
                                        {dueDate ? format(dueDate, "MMM dd, yyyy") : "Select date"}
                                    </span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <Button
                                className="w-full h-12 rounded-xl text-lg font-bold bg-gradient-to-r from-sky-600 to-purple-600 hover:from-sky-700 hover:to-purple-700 shadow-lg cursor-pointer"
                                onClick={handleSubmit}
                                disabled={isProcessing || !dueDate}
                            >
                                {isProcessing ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    "Confirm Borrow"
                                )}
                            </Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}