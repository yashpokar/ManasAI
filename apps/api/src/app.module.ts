import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'

import { ProjectModule } from '@/modules/project.module'
import { ProjectEntity } from './models/project'
import { MessageModule } from './modules/message.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(__dirname, 'schema.gql'),
      installSubscriptionHandlers: true
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '../../../../tmp', 'database.sqlite'),
      entities: [ProjectEntity],
      synchronize: true
    }),
    ProjectModule,
    MessageModule
  ],
  controllers: []
})
export class AppModule {}
