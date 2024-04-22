import Loader from './components/Loader'

const Splash: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <Loader className="h-8 w-8 text-zinc-500 dark:text-zinc-400" />

      <div className="text-zinc-500 dark:text-zinc-400">
        Setting up things...
      </div>
    </div>
  )
}

export default Splash
