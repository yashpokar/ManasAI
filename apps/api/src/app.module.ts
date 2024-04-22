import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'

import { ProjectModule } from '@/modules/project.module'
import { ProjectEntity } from '@/models/project'
import { MessageModule } from '@/modules/message.module'
import { MessageEntity } from '@/models/message'
import { PreviewModule } from './modules/preview.module'
import { AIModule } from '@core/core'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '::',
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(__dirname, 'schema.gql'),
      subscriptions: {
        'graphql-ws': true,
        // Note: subscriptions-transport-ws is a fallback for clients that do not support graphql-ws
        'subscriptions-transport-ws': true
      }
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '../../../../tmp', 'database.sqlite'),
      entities: [ProjectEntity, MessageEntity],
      synchronize: true
    }),
    AIModule,
    ProjectModule,
    MessageModule,
    PreviewModule
  ]
})
export class AppModule {}
