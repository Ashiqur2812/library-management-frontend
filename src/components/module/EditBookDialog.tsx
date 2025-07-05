import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateBookMutation } from "@/redux/api/bookApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { IBook } from "types";
import { motion } from "framer-motion";
import { BookOpen, Image as ImageIcon, PenLine, X } from "lucide-react";

interface FormState {
    title: string;
    author: string;
    genre: string;
    isbn: string;
    image: string;
    copies: number;
    description?: string;
}

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    book: IBook | null;
    onSuccess: () => void;
}

const genreOptions = [
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY"
];

export default function EditBookDialog({
    open,
    onOpenChange,
    book,
    onSuccess,
}: Props) {
    const [form, setForm] = useState<FormState>({
        title: "",
        author: "",
        genre: "",
        isbn: "",
        image: "",
        copies: 0,
        description: ""
    });

    const [imagePreview, setImagePreview] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [updateBook] = useUpdateBookMutation();
    console.log(updateBook)

    useEffect(() => {
        if (book) {
            setForm({
                title: book.title,
                author: book.author,
                genre: book.genre,
                isbn: book.isbn,
                image: book.image,
                copies: book.copies,
                description: book.description || ""
            });
            setImagePreview(book.image);
        }
    }, [book]);

    const handleSubmit = async () => {
        if (!book) return;

        // Basic validation
        if (!form.title || !form.author || !form.genre || !form.isbn || !form.image || form.copies < 1) {
            toast.error("Please fill all required fields");
            return;
        }

        setIsLoading(true);

        try {
            await updateBook({ id: book._id, data: form }).unwrap();
            toast.success("Book updated successfully!");
            onOpenChange(false);
            onSuccess();
        } catch (err) {
            console.error(err);
            toast.error("Failed to update book");
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setForm(prev => ({ ...prev, image: value }));
        setImagePreview(value);
    };

    const handleClose = () => {
        if (!isLoading) {
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl p-0 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-gray-800 dark:to-gray-900 border-2 border-teal-200 dark:border-teal-800">
                <div className="relative">
                    {/* Classical header with parchment styling */}
                    <div className="bg-gradient-to-r from-teal-700 to-teal-800 p-5 border-b-2 border-teal-900">
                        <DialogHeader className="text-left">
                            <DialogTitle className="text-xl md:text-2xl font-serif font-bold text-teal-100 flex items-center">
                                <PenLine className="mr-2 h-5 w-5 md:h-6 md:w-6 text-teal-200" />
                                Edit Book Details
                            </DialogTitle>
                        </DialogHeader>

                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-3 p-1.5 rounded-full bg-teal-800/60 hover:bg-teal-700 text-teal-100"
                            disabled={isLoading}
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="p-4 md:p-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                            {/* Left Column - Book Preview */}
                            <div className="space-y-4">
                                <div className="bg-teal-50 dark:bg-gray-800 rounded-lg border-2 border-teal-300 dark:border-teal-700 shadow-sm aspect-[2/3] overflow-hidden flex items-center justify-center">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Book cover preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = "https://via.placeholder.com/300x450?text=Invalid+URL";
                                                e.currentTarget.alt = "Invalid image URL";
                                            }}
                                        />
                                    ) : (
                                        <div className="text-center p-3 text-teal-800 dark:text-teal-200">
                                            <ImageIcon className="mx-auto h-8 w-8 md:h-10 md:w-10 mb-2" />
                                            <p className="text-sm md:text-base">Book cover preview</p>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <Label className="flex items-center text-teal-900 dark:text-teal-200 text-sm md:text-base">
                                        <ImageIcon className="mr-2 h-4 w-4" />
                                        Cover Image URL
                                    </Label>
                                    <Input
                                        value={form.image}
                                        onChange={handleImageChange}
                                        placeholder="Enter book cover URL"
                                        className="bg-white dark:bg-gray-800 border-2 border-teal-300 focus:border-teal-500 text-sm h-9 md:h-10"
                                    />
                                </div>
                            </div>

                            {/* Right Column - Form Fields */}
                            <div className="space-y-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <Label className="flex items-center text-teal-900 dark:text-teal-200 text-sm md:text-base">
                                            <BookOpen className="mr-2 h-4 w-4" />
                                            Title *
                                        </Label>
                                        <Input
                                            value={form.title}
                                            onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                                            placeholder="Book title"
                                            className="bg-white dark:bg-gray-800 border-2 border-teal-300 focus:border-teal-500 text-sm h-9 md:h-10"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label className="flex items-center text-teal-900 dark:text-teal-200 text-sm md:text-base">
                                            <BookOpen className="mr-2 h-4 w-4" />
                                            Author *
                                        </Label>
                                        <Input
                                            value={form.author}
                                            onChange={(e) => setForm(prev => ({ ...prev, author: e.target.value }))}
                                            placeholder="Author name"
                                            className="bg-white dark:bg-gray-800 border-2 border-teal-300 focus:border-teal-500 text-sm h-9 md:h-10"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <Label className="flex items-center text-teal-900 dark:text-teal-200 text-sm md:text-base">
                                            <BookOpen className="mr-2 h-4 w-4" />
                                            Genre *
                                        </Label>
                                        <select
                                            value={form.genre}
                                            onChange={(e) => setForm(prev => ({ ...prev, genre: e.target.value }))}
                                            className="flex h-9 md:h-10 w-full rounded-md border-2 border-teal-300 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        >
                                            <option value="">Select genre</option>
                                            {genreOptions.map(genre => (
                                                <option key={genre} value={genre} className="bg-teal-50 dark:bg-gray-800">
                                                    {genre.replace("_", " ")}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-1">
                                        <Label className="flex items-center text-teal-900 dark:text-teal-200 text-sm md:text-base">
                                            <BookOpen className="mr-2 h-4 w-4" />
                                            ISBN *
                                        </Label>
                                        <Input
                                            value={form.isbn}
                                            onChange={(e) => setForm(prev => ({ ...prev, isbn: e.target.value }))}
                                            placeholder="ISBN number"
                                            className="bg-white dark:bg-gray-800 border-2 border-teal-300 focus:border-teal-500 text-sm h-9 md:h-10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <Label className="flex items-center text-teal-900 dark:text-teal-200 text-sm md:text-base">
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        Available Copies *
                                    </Label>
                                    <div className="flex items-center w-full">
                                        <button
                                            type="button"
                                            onClick={() => setForm(prev => ({ ...prev, copies: Math.max(1, prev.copies - 1) }))}
                                            disabled={form.copies <= 1}
                                            className="bg-teal-200 dark:bg-teal-800 rounded-l-lg px-3 py-1.5 border-y-2 border-l-2 border-teal-300 dark:border-teal-700 hover:bg-teal-300 dark:hover:bg-teal-700 disabled:opacity-50 text-sm"
                                        >
                                            -
                                        </button>
                                        <Input
                                            type="number"
                                            min="1"
                                            value={form.copies}
                                            onChange={(e) => setForm(prev => ({ ...prev, copies: Math.max(1, Number(e.target.value)) }))}
                                            className="rounded-none text-center border-y-2 border-teal-300 focus:border-teal-500 text-sm h-9 md:h-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setForm(prev => ({ ...prev, copies: prev.copies + 1 }))}
                                            className="bg-teal-200 dark:bg-teal-800 rounded-r-lg px-3 py-1.5 border-y-2 border-r-2 border-teal-300 dark:border-teal-700 hover:bg-teal-300 dark:hover:bg-teal-700 text-sm"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <Label className="flex items-center text-teal-900 dark:text-teal-200 text-sm md:text-base">
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        Description
                                    </Label>
                                    <textarea
                                        value={form.description}
                                        onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                                        placeholder="Book description"
                                        rows={3}
                                        className="flex w-full rounded-md border-2 border-teal-300 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-5 pt-4 border-t border-teal-300 dark:border-teal-800">
                            <Button
                                variant="outline"
                                onClick={handleClose}
                                disabled={isLoading}
                                className="border-2 border-teal-400 text-teal-900 hover:bg-teal-200 dark:hover:bg-teal-900 w-full sm:w-auto text-sm h-9 cursor-pointer"
                            >
                                Cancel
                            </Button>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className={`
                    px-4 py-1.5 rounded-lg font-medium text-white flex items-center justify-center text-sm h-9 cursor-pointer
                    ${isLoading
                                        ? 'bg-teal-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900'} w-full sm:w-auto
                `}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <PenLine className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}