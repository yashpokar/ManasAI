import React, { useEffect } from 'react'
import CodeEditor, { useMonaco } from '@monaco-editor/react'
import useTheme from '@/hooks/use-theme'
import usePreview from '@/hooks/use-preview'

const Editor: React.FC = () => {
  const monaco = useMonaco()
  const { isDarkMode } = useTheme()
  const { editor: editorPreview } = usePreview()

  useEffect(() => {
    monaco?.editor.defineTheme('manas-ai', {
      base: isDarkMode ? 'vs-dark' : 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': isDarkMode ? '#18181b' : '#f4f4f5'
      }
    })

    monaco?.editor.setTheme('manas-ai')
  }, [monaco, isDarkMode])

  return (
    <div className="flex h-full w-full">
      <section className="flex-1">
        <CodeEditor
          height="100%"
          theme="manas-ai"
          defaultLanguage="python"
          defaultValue={
            editorPreview.content ??
            `"""Welcome to ManasAI Editor! 🚀

ManasAI will write a code once starts executing its plan.
"""
`
          }
          options={{
            fontFamily:
              'SF Mono, Menlo, Roboto Mono, Ubuntu Mono, Oxygen Mono, monospace',
            fontSize: 14,
            minimap: {
              enabled: false
            },
            hideCursorInOverviewRuler: true,
            renderLineHighlight: 'none',
            guides: {
              highlightActiveIndentation: false,
              indentation: false
            },
            overviewRulerLanes: 0,
            scrollbar: {
              horizontalScrollbarSize: 6,
              verticalScrollbarSize: 6,
              useShadows: false
            },
            roundedSelection: false,
            scrollBeyondLastLine: false,
            tabSize: 2,
            codeLens: false
          }}
        />
      </section>
    </div>
  )
}

export default Editor
