import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put
} from '@nestjs/common'
import {
  ApiAcceptedResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { DeleteResult, UpdateResult } from 'typeorm'
import { T_Todo } from '../models/todo.interface'
import { TodoService } from '../service/todo.service'

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  @Inject(TodoService)
  private readonly service: TodoService

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        label: { description: 'The Label of the Todo', type: 'string' },
        priority: {
          description: 'The Priority 0 - 10 of the Todo',
          type: 'number',
          required: ['false'],
          default: 5
        },
        done: {
          description: 'The Status of the Todo',
          type: 'boolean',
          default: false
        },
        position: {
          description: 'The Position of the Todo',
          type: 'number'
        }
      }
    }
  })
  @Post()
  @ApiOperation({
    summary: 'Create ToDo in the Database with content from Body'
  })
  @ApiCreatedResponse({ description: 'ToDo was Created in the Database' })
  public createTodo(@Body() todo: T_Todo): Promise<T_Todo> {
    return this.service.addOne(todo)
  }

  @Get()
  @ApiOperation({
    summary: 'Returns all ToDos from Database'
  })
  @ApiOkResponse({ description: 'All ToDos are Returned from the Database' })
  public findAllTodos(): Promise<T_Todo[]> {
    return this.service.findAll()
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Returns ToDo from Database by ID from Path variable'
  })
  @ApiOkResponse({ description: 'ToDo was Returned from the Database' })
  public findTodoByName(@Param('id') id: number): Promise<T_Todo> {
    return this.service.findOne(id)
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        label: { description: 'The Label of the Todo', type: 'string' },
        priority: {
          description: 'The Priority 0 - 10 of the Todo',
          type: 'number'
        },
        done: {
          description: 'The Status of the Todo',
          type: 'boolean'
        },
        position: {
          description: 'The Position of the Todo',
          type: 'number'
        }
      }
    }
  })
  @Put('/:id')
  @ApiOperation({
    summary: 'Updates ToDo by ID from Path, with content from Body'
  })
  @ApiOkResponse({ description: 'ToDo was Updated in the Database' })
  @ApiNoContentResponse({
    description: 'ToDo was Updated in the Database, but got no Response'
  })
  public updateTodo(
    @Param('id') id: number,
    @Body() todo: T_Todo
  ): Promise<UpdateResult> {
    return this.service.updateOne(id, todo)
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Deletes ToDo from Database by ID from Path.' })
  @ApiOkResponse({ description: 'ToDo was Deleted from the Database' })
  @ApiAcceptedResponse({ description: 'ToDo will be Deleted from Database' })
  @ApiNoContentResponse({
    description: 'ToDo was Deleted from the Database, but got no Response'
  })
  public deleteTodo(@Param('id') id: number): Promise<DeleteResult> {
    return this.service.removeOne(id)
  }
}
