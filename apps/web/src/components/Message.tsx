import { UserIcon } from '@heroicons/react/24/outline'
import React from 'react'
import RobotIcon from './RobotIcon'
import clsx from 'clsx'
import { Message as MessageProps } from '@/types'

const Message: React.FC<MessageProps> = ({ author, content }) => {
  const isUser = author === 'USER'

  return (
    <div className="flex flex-col gap-y-1.5">
      <div className={clsx('inline-flex', { 'self-end': isUser })}>
        <div
          className={clsx(
            'p-2 lg:p-3 font-chat text-sm opacity-85 text-ellipsis overflow-hidden',
            {
              'rounded-e-full mr-8 bg-zinc-100 dark:bg-zinc-700 dark:text-zinc-100':
                !isUser,
              'rounded-s-full text-right bg-indigo-600 text-zinc-100': isUser
            }
          )}
        >
          {content}
        </div>
      </div>

      <div
        className={clsx('bg-zinc-300 dark:bg-zinc-700 p-1 rounded-full', {
          'self-end': isUser,
          'self-start': !isUser
        })}
      >
        {isUser ? (
          <UserIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-100" />
        ) : (
          <RobotIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-100" />
        )}
      </div>
    </div>
  )
}

export default Message
