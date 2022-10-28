import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { EventPing } from 'src/app/_interface/eventping'
import { ToDo } from 'src/app/_interface/todo'
import { ToDoService } from 'src/app/_service/todo/to-do.service'

@Component({
  selector: 'app-template-todo',
  templateUrl: './template-todo.component.html',
  styleUrls: ['./template-todo.component.sass']
})
export class TemplateTodoComponent implements OnInit {
  @Input() public toDo: ToDo
  public editToDo: boolean
  public priorityOptions: Array<number>

  @Output() ping: EventEmitter<any> = new EventEmitter<any>()

  constructor(public _toDoService: ToDoService) {
    this.editToDo = false
    this.priorityOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    this.toDo = {
      id: undefined,
      label: '',
      done: false,
      priority: 5,
      position: 0
    }
  }

  ngOnInit(): void {}

  public updateToDo(e?: Event): void {
    this.editToDo = false
    this._toDoService.updateOneToDo(this.toDo.id, this.toDo).subscribe({
      next: (): void => {
        const ping: EventPing = {
          label: 'update',
          toDo: this.toDo
        }
        this.ping.emit(ping)
      },
      error: (error): void => {
        console.warn(error)
      }
    })
  }

  public checkToDo(e?: Event): void {
    this.toDo.done = !this.toDo.done
    this._toDoService.updateOneToDo(this.toDo.id, this.toDo).subscribe({
      next: (): void => {
        const ping: EventPing = {
          label: 'check',
          toDo: this.toDo
        }
        this.ping.emit(ping)
      },
      error: (error): void => {
        console.warn(error)
      }
    })
  }

  public deleteToDo(e?: Event): void {
    this._toDoService.deleteOneToDo(this.toDo.id).subscribe({
      next: (): void => {
        const ping: EventPing = {
          label: 'delete',
          toDo: this.toDo
        }
        this.ping.emit(ping)
      },
      error: (error): void => {
        console.warn(error)
      }
    })
  }
}
