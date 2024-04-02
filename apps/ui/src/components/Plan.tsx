import clsx from 'clsx'
import React, { useState } from 'react'

interface Step {
  title: string
  completed: boolean
}

const Plan: React.FC = () => {
  const [steps] = useState<Step[]>([])

  return (
    <div className="flex flex-col gap-y-2 p-2 md:p-4 lg:p-6">
      <h2 className="text-2xl font-semibold dark:text-zinc-100">Plan</h2>

      {steps.length === 0 && (
        <p className="text-gray-500 dark:text-zinc-500">
          No plan of action ready yet.
        </p>
      )}

      {steps.map((step, idx) => (
        <div className="flex items-center gap-x-2" key={idx}>
          <input
            type="checkbox"
            className="form-checkbox rounded text-indigo-500 focus:ring-0 focus:border-none"
            checked={step.completed}
            readOnly
          />

          <span
            className={clsx('font-chat leading-loose dark:text-zinc-100', {
              'line-through': step.completed
            })}
          >
            {step.title}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Plan
