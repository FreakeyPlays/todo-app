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

  addOne(todo: T_Todo): Promise<Todo> {
    return this.todoRepository.save<Todo>(todo)
  }

  findAll(): Promise<T_Todo[]> {
    return this.todoRepository.find()
  }

  findOne(id: number): Promise<T_Todo> {
    return this.todoRepository.findOneBy({ id })
  }

  updateOne(id: number, todo: T_Todo): Promise<UpdateResult> {
    return this.todoRepository.update(id, todo)
  }

  async removeOne(id: number): Promise<DeleteResult> {
    return this.todoRepository.delete(id)
  }

  async removeAll() {
    return this.todoRepository.clear()
  }
}
