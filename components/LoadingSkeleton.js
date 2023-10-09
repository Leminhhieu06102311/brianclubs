export default function LoadingSkeleton() {
  return (
    <>
      <div className="min-h-[50rem] flex flex-col bg-[rgba(136,139,147,.01)] z-10 fixed top-0 right-0 bottom-0 left-0 border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
        <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
          <div className="flex justify-center">
            <div
              className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}