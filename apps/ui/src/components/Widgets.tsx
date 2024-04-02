import React from 'react'
import { Tab } from '@headlessui/react'
import Shell from './Shell'
import Editor from './Editor'
import WebBrowser from './WebBrowser'

const Widgets: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full rounded-lg bg-zinc-200 dark:bg-zinc-800">
      <div className="flex flex-col flex-1 p-1.5 md:p-2.5 lg:p-6 pt-0 md:pt-0 lg:pt-0">
        <Tab.Group defaultIndex={1}>
          <Tab.List className="flex px-4 gap-x-2 md:gap-x-4 lg:gap-x-8">
            <Tab className="py-1 md:py-2 lg:py-3 focus:outline-none">
              <span className="font-medium text-sm text-zinc-700 dark:text-zinc-400 ui-selected:text-zinc-900 ui-selected:font-semibold dark:ui-selected:text-zinc-200">
                Shell
              </span>
            </Tab>
            <Tab className="py-1 md:py-2 lg:py-3 focus:outline-none">
              <span className="font-medium text-sm text-zinc-700 dark:text-zinc-400 ui-selected:text-zinc-900 ui-selected:font-semibold dark:ui-selected:text-zinc-200">
                Browser
              </span>
            </Tab>
            <Tab className="py-1 md:py-2 lg:py-3 focus:outline-none">
              <span className="font-medium text-sm text-zinc-700 dark:text-zinc-400 ui-selected:text-zinc-900 ui-selected:font-semibold dark:ui-selected:text-zinc-200">
                Editor
              </span>
            </Tab>
            <Tab className="py-1 md:py-2 lg:py-3 focus:outline-none">
              <span className="font-medium text-sm text-zinc-700 dark:text-zinc-400 ui-selected:text-zinc-900 ui-selected:font-semibold dark:ui-selected:text-zinc-200">
                Planner
              </span>
            </Tab>
          </Tab.List>

          <Tab.Panels
            className="border p-1 flex-1 rounded-lg border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900"
            id="tabs"
          >
            <Tab.Panel className="h-full">
              <Shell />
            </Tab.Panel>
            <Tab.Panel className="h-full">
              <WebBrowser />
            </Tab.Panel>
            <Tab.Panel className="h-full">
              <Editor />
            </Tab.Panel>
            <Tab.Panel className="h-full"></Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default Widgets
