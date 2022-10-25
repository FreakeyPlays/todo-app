import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Todo } from './todo/models/todo.entity'
import { TodoModule } from './todo/todo.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 54321,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: [Todo],
      synchronize: true
    }),
    TodoModule
  ]
})
export class AppModule {}
