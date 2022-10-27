import { Component, Input, OnInit } from '@angular/core'
import { ToDo } from 'src/app/_interface/todo'

@Component({
  selector: 'app-template-todo',
  templateUrl: './template-todo.component.html',
  styleUrls: ['./template-todo.component.sass']
})
export class TemplateTodoComponent implements OnInit {
  @Input() public toDo: ToDo
  public editToDo: boolean
  public priorityOptions: Array<number>

  constructor() {
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

  public switchToDoDone(e?: Event): void {}
  public updateToDo(e?: Event): void {
    this.editToDo = false
  }
  public deleteToDo(e?: Event): void {}
}
