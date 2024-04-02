const WebBrowser: React.FC = () => {
  return (
    <div className="flex flex-col justify-center gap-y-2 h-full w-full">
      <div className="flex justify-center items-center mt-4">
        <div className="flex gap-x-2 -ml-20 mr-10">
          <span className="w-3 h-3 p-1 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 p-1 bg-gray-500 rounded-full"></span>
          <span className="w-3 h-3 p-1 bg-green-500 rounded-full"></span>
        </div>

        <span className="py-1.5 px-4 font-medium text-sm text-zinc-700 bg-zinc-200 dark:text-zinc-50 dark:bg-zinc-700 rounded-full w-3/5">
          https://scrapy.org/
        </span>
      </div>

      <div className="flex-1 p-2 lg:p-4 lg:pt-2.5">
        <iframe
          title="ManasAI Browser"
          src="https://scrapy.org/"
          className="h-full w-full rounded-b-lg"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  )
}

export default WebBrowser
