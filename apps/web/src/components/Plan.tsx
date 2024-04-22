import usePreview from '@/hooks/use-preview'
import React from 'react'

const Plan: React.FC = () => {
  const {
    plan: { steps }
  } = usePreview()

  return (
    <div className="flex flex-col gap-y-2 p-2 md:p-4 lg:p-6">
      <h2 className="text-2xl font-semibold dark:text-zinc-100">Plan</h2>

      {steps.length === 0 && (
        <p className="text-gray-500 dark:text-zinc-500">
          No plan of action ready yet.
        </p>
      )}

      <div className="grid gap-y-1.5 mt-4 overflow-y-auto">
        {steps.map((step, idx) => (
          <div className="flex items-center text-sm gap-x-2" key={idx}>
            <span className={'font-chat leading-relaxed dark:text-zinc-100'}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Plan
