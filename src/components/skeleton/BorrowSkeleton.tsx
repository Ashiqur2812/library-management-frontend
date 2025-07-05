const BorrowSkeleton = () => {
    return (
        <div className="animate-pulse space-y-6">
            {/* Header skeleton */}
            <div className="flex justify-between items-center mb-6">
                <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-neutral-700 dark:to-neutral-800 rounded-lg w-1/3" />
                <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-neutral-700 dark:to-neutral-800 rounded-xl w-24" />
            </div>

            {/* Stats overview skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="bg-gray-200 dark:bg-neutral-800 rounded-full w-12 h-12" />
                            <div className="flex-1">
                                <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded w-1/2 mb-3" />
                                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-neutral-700 dark:to-neutral-800 rounded w-3/4" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table header skeleton */}
            <div className="grid grid-cols-12 gap-4 mb-3 px-4">
                <div className="col-span-4 h-4 bg-gray-200 dark:bg-neutral-800 rounded" />
                <div className="col-span-2 h-4 bg-gray-200 dark:bg-neutral-800 rounded" />
                <div className="col-span-3 h-4 bg-gray-200 dark:bg-neutral-800 rounded" />
                <div className="col-span-3 h-4 bg-gray-200 dark:bg-neutral-800 rounded" />
            </div>

            {/* Table rows skeleton */}
            <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="relative overflow-hidden bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-4 shadow-sm"
                    >
                        {/* Shimmer effect overlay */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 dark:via-neutral-900/30 to-transparent shimmer" />

                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-4 flex items-center space-x-3">
                                <div className="bg-gray-200 dark:bg-neutral-800 rounded-lg w-14 h-20" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded w-3/4" />
                                    <div className="h-3 bg-gray-200 dark:bg-neutral-800 rounded w-1/2" />
                                </div>
                            </div>

                            <div className="col-span-2 flex items-center">
                                <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-neutral-700 dark:to-neutral-800 rounded-full w-8" />
                                <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded w-1/2 ml-2" />
                            </div>

                            <div className="col-span-3 flex items-center">
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 bg-gray-200 dark:bg-neutral-800 rounded w-4/5" />
                                    <div className="h-3 bg-gray-200 dark:bg-neutral-800 rounded w-3/5" />
                                </div>
                            </div>

                            <div className="col-span-3 flex items-center justify-end space-x-2">
                                <div className="h-10 bg-gray-200 dark:bg-neutral-800 rounded-lg w-16" />
                                <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-neutral-700 dark:to-neutral-800 rounded-lg w-16" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination skeleton */}
            <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200 dark:border-neutral-800">
                <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded w-1/4" />
                <div className="flex space-x-2">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-10 w-10 bg-gray-200 dark:bg-neutral-800 rounded-lg" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BorrowSkeleton;