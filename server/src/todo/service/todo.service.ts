import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm'
import { Todo } from '../models/todo.entity'
import { T_Todo } from '../models/todo.interface'

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>
  ) {}

  addOne(todo: T_Todo): Promise<InsertResult> {
    return this.todoRepository
      .createQueryBuilder()
      .insert()
      .into(Todo)
      .values([
        {
          label: todo.label,
          priority: todo.priority ? todo.priority : undefined,
          done: todo.done ? todo.done : undefined
        }
      ])
      .execute()
  }

  findAll(): Promise<T_Todo[]> {
    return this.todoRepository.find()
  }

  findOne(id: number): Promise<T_Todo> {
    return this.todoRepository.findOneBy({ id })
  }

  updateOne(id: number, todo: T_Todo): Promise<UpdateResult> {
    return this.todoRepository
      .createQueryBuilder()
      .update(Todo)
      .set({
        label: todo.label,
        priority: todo.priority,
        done: todo.done
      })
      .where('id = :id', { id })
      .execute()
  }

  async removeOne(id: number): Promise<DeleteResult> {
    return this.todoRepository.delete(id)
  }
}
