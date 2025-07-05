const CardSkeleton = () => {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
            {/* Shimmer overlay */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-neutral-900/40 to-transparent shimmer" />

            <div className="animate-pulse p-4 space-y-4">
                {/* Book cover placeholder with aspect ratio */}
                <div className="relative aspect-[2/3] bg-gradient-to-r from-gray-200 to-gray-300 dark:from-neutral-800 dark:to-neutral-700 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-gray-300 dark:bg-neutral-700 rounded-full w-12 h-12 flex items-center justify-center">
                            <div className="bg-gray-400 dark:bg-neutral-600 rounded-full w-6 h-6" />
                        </div>
                    </div>
                </div>
                {/* Title and author */}
                <div className="space-y-3 pt-2">
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-neutral-800 dark:to-neutral-700 rounded-full w-4/5" />
                    <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-neutral-800 dark:to-neutral-700 rounded-full w-3/5" />
                </div>
                {/* Book details */}
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <div className="bg-gray-200 dark:bg-neutral-800 rounded-full w-4 h-4" />
                        <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-neutral-800 dark:to-neutral-700 rounded-full w-1/3" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="bg-gray-200 dark:bg-neutral-800 rounded-full w-4 h-4" />
                        <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-neutral-800 dark:to-neutral-700 rounded-full w-2/5" />
                    </div>
                </div>
                {/* Availability status */}
                <div className="flex items-center space-x-2">
                    <div className="bg-gray-200 dark:bg-neutral-800 rounded-full w-3 h-3" />
                    <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-neutral-800 dark:to-neutral-700 rounded-full w-1/4" />
                </div>
                {/* Action buttons */}
                <div className="flex items-center justify-between pt-3">
                    <div className="h-9 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-neutral-800 dark:to-neutral-700 rounded-lg w-24" />
                    <div className="flex gap-2">
                        <div className="h-9 w-9 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-neutral-800 dark:to-neutral-700 rounded-lg" />
                        <div className="h-9 w-9 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-neutral-800 dark:to-neutral-700 rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardSkeleton;