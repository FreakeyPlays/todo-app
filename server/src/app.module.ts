import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Todo } from './todo/models/todo.entity'
import { TodoModule } from './todo/todo.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGDB_HOST || 'postgres-db',
      port: parseInt(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'password',
      database: process.env.postgres || 'postgres',
      entities: [Todo],
      synchronize: true
    }),
    TodoModule
  ]
})
export class AppModule {}
