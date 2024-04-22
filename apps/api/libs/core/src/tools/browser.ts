import { z } from 'zod'
import { Tool } from './tool'
import { Injectable } from '@nestjs/common'
import { chromium } from 'playwright'
import { Browser } from '../models/browser'
import { PREVIEW_EVENT, TOPIC_BROWSER } from '../constants'
import { EventEmitter2 } from '@nestjs/event-emitter'

@Injectable()
class BrowserTool extends Tool {
  protected name = 'browser'
  protected description = `Tool that allows an agent to test/preview web page using playwright so that it can know if generated code is working as expected.`

  protected schema = z.object({
    projectId: z.string().describe('The project ID to execute the command in.'),
    url: z
      .string()
      .describe(
        'The URL to test/preview if deployed then http or https or localhost.'
      )
  })

  constructor(private readonly eventEmitter: EventEmitter2) {
    super()
  }

  public async execute({ url }) {
    this.logger.debug(`testing or previewing URL: ${url}`)

    // TODO: turn the headless mode to true after testing is done
    const browser = await chromium.launch({ headless: false })
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto(url)

    const content = await page.content()

    await browser.close()

    const onBrowserPreview: Browser = {
      url,
      content
    }

    this.eventEmitter.emit(PREVIEW_EVENT, TOPIC_BROWSER, { onBrowserPreview })

    return content
  }
}

export default BrowserTool
