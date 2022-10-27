import { Component, OnInit } from '@angular/core'
import { ToDo } from 'src/app/_interface/todo'

@Component({
  selector: 'app-template-todo-form',
  templateUrl: './template-todo-form.component.html',
  styleUrls: ['./template-todo-form.component.sass']
})
export class TemplateTodoFormComponent implements OnInit {
  public priorityOptions: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  public selectedPriority: number = 5

  public newToDo: ToDo

  constructor() {
    this.newToDo = {
      id: undefined,
      label: '',
      done: false,
      priority: 5,
      position: 0
    }
  }

  ngOnInit(): void {}

  public createNewToDo(e?: Event): void {
    if (typeof this.newToDo.priority === 'string') {
      this.newToDo.priority = parseInt(this.newToDo.priority)
    }

    this.newToDo = {
      id: undefined,
      label: '',
      done: false,
      priority: 5,
      position: 0
    }
  }
}
