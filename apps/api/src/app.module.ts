import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'

import { ProjectModule } from '@/modules/project.module'
import { ProjectEntity } from './models/project'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(__dirname, 'schema.gql')
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '../../../..', 'database.sqlite'),
      entities: [ProjectEntity],
      synchronize: true
    }),
    ProjectModule
  ],
  controllers: []
})
export class AppModule {}
