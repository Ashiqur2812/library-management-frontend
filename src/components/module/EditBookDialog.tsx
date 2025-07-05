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
            <DialogContent className="sm:max-w-2xl rounded-2xl p-0 overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <div className="relative">
                    {/* Dialog header with gradient background */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                        <DialogHeader className="text-left">
                            <DialogTitle className="text-2xl font-bold text-white flex items-center">
                                <PenLine className="mr-2 h-6 w-6" />
                                Edit Book Details
                            </DialogTitle>
                        </DialogHeader>

                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white"
                            disabled={isLoading}
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column - Book Preview */}
                            <div className="space-y-6">
                                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 aspect-[2/3] overflow-hidden flex items-center justify-center">
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
                                        <div className="text-center p-4 text-gray-500">
                                            <ImageIcon className="mx-auto h-12 w-12 mb-2" />
                                            <p>Book cover preview</p>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center text-gray-700 dark:text-gray-300">
                                        <ImageIcon className="mr-2 h-4 w-4" />
                                        Cover Image URL
                                    </Label>
                                    <Input
                                        value={form.image}
                                        onChange={handleImageChange}
                                        placeholder="https://example.com/book-cover.jpg"
                                    />
                                </div>
                            </div>

                            {/* Right Column - Form Fields */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="flex items-center text-gray-700 dark:text-gray-300">
                                            <BookOpen className="mr-2 h-4 w-4" />
                                            Title *
                                        </Label>
                                        <Input
                                            value={form.title}
                                            onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                                            placeholder="Book title"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="flex items-center text-gray-700 dark:text-gray-300">
                                            <BookOpen className="mr-2 h-4 w-4" />
                                            Author *
                                        </Label>
                                        <Input
                                            value={form.author}
                                            onChange={(e) => setForm(prev => ({ ...prev, author: e.target.value }))}
                                            placeholder="Author name"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="flex items-center text-gray-700 dark:text-gray-300">
                                            <BookOpen className="mr-2 h-4 w-4" />
                                            Genre *
                                        </Label>
                                        <select
                                            value={form.genre}
                                            onChange={(e) => setForm(prev => ({ ...prev, genre: e.target.value }))}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="">Select genre</option>
                                            {genreOptions.map(genre => (
                                                <option key={genre} value={genre}>
                                                    {genre.replace("_", " ")}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="flex items-center text-gray-700 dark:text-gray-300">
                                            <BookOpen className="mr-2 h-4 w-4" />
                                            ISBN *
                                        </Label>
                                        <Input
                                            value={form.isbn}
                                            onChange={(e) => setForm(prev => ({ ...prev, isbn: e.target.value }))}
                                            placeholder="ISBN number"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center text-gray-700 dark:text-gray-300">
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        Available Copies *
                                    </Label>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => setForm(prev => ({ ...prev, copies: Math.max(1, prev.copies - 1) }))}
                                            disabled={form.copies <= 1}
                                            className="bg-gray-100 dark:bg-gray-800 rounded-l-lg px-4 py-2 border border-r-0 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            -
                                        </button>
                                        <Input
                                            type="number"
                                            min="1"
                                            value={form.copies}
                                            onChange={(e) => setForm(prev => ({ ...prev, copies: Math.max(1, Number(e.target.value)) }))}
                                            className="rounded-none text-center"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setForm(prev => ({ ...prev, copies: prev.copies + 1 }))}
                                            className="bg-gray-100 dark:bg-gray-800 rounded-r-lg px-4 py-2 border border-l-0 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center text-gray-700 dark:text-gray-300">
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        Description
                                    </Label>
                                    <textarea
                                        value={form.description}
                                        onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                                        placeholder="Book description"
                                        rows={3}
                                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <Button
                                variant="outline"
                                onClick={handleClose}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className={`
                  px-6 py-2 rounded-lg font-medium text-white flex items-center
                  ${isLoading
                                        ? 'bg-indigo-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg'}
                `}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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