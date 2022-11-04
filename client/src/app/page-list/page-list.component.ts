import { Component, OnDestroy, OnInit } from '@angular/core'
import { DragulaService } from 'ng2-dragula'
import { Subscription } from 'rxjs'
import { EventPing } from '../_interface/eventping'
import { ToDo } from '../_interface/todo'
import { ToDoService } from '../_service/todo/to-do.service'

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass']
})
export class PageListComponent implements OnInit, OnDestroy {
  public openToDos: Array<ToDo>
  public showOpenToDos: boolean
  public doneToDos: Array<ToDo>
  public showDoneToDos: boolean

  public subscription: Subscription = new Subscription()

  constructor(
    public _dragulaService: DragulaService,
    public _toDoService: ToDoService
  ) {
    this.openToDos = []
    this.showOpenToDos = true
    this.doneToDos = []
    this.showDoneToDos = true

    this.loadToDosFromDatabase()

    this._dragulaService.createGroup('todos', {
      removeOnSpill: false
    })

    this.subscription.add(
      _dragulaService.drop('todos').subscribe(({ el }) => {
        this.rearrangePositionInArray()
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {}

  public rearrangePositionInArray(): void {
    let position: number = 0

    for (let toDo of this.openToDos) {
      position += 1
      toDo.position = position

      this._toDoService.updateOneToDo(toDo.id, toDo).subscribe({
        error: (error): void => {
          console.warn(error)
        }
      })
    }
  }

  public loadToDosFromDatabase(): void {
    this.openToDos = []
    this.doneToDos = []

    this._toDoService.getAllToDos().subscribe({
      next: (allToDos: ToDo[]): void => {
        for (let toDo of allToDos) {
          if (toDo.done) {
            this.doneToDos.push(toDo)
          } else {
            this.openToDos.push(toDo)
          }
        }
      },
      error: (error): void => {
        console.warn(error)
      }
    })
  }

  public createToDo(newToDo: ToDo): void {
    newToDo.position = this.openToDos.length + 1

    this._toDoService.createOneToDo(newToDo).subscribe({
      next: (toDo: ToDo): void => {
        this.openToDos.push(toDo)
      },
      error: error => {
        console.warn(error)
      }
    })
  }

  public updateToDo(ping: EventPing): void {
    if (ping.label === 'check') {
      if (ping.toDo.done) {
        this.openToDos.splice(this.openToDos.indexOf(ping.toDo), 1)
        this.doneToDos.push(ping.toDo)
      } else {
        this.doneToDos.splice(this.doneToDos.indexOf(ping.toDo), 1)
        this.openToDos.push(ping.toDo)
      }
    }

    if (ping.label === 'delete') {
      if (ping.toDo.done) {
        this.doneToDos.splice(this.doneToDos.indexOf(ping.toDo), 1)
      } else {
        this.openToDos.splice(this.openToDos.indexOf(ping.toDo), 1)
      }
    }

    if (ping.label === 'update') {
      if (ping.toDo.done) {
        for (let toDo of this.doneToDos) {
          if (toDo.id === ping.toDo.id) {
            toDo.label = ping.toDo.label
            toDo.priority = ping.toDo.priority
          }
        }
      } else {
        for (let toDo of this.openToDos) {
          if (toDo.id === ping.toDo.id) {
            toDo.label = ping.toDo.label
            toDo.priority = ping.toDo.priority
          }
        }
      }
    }
  }
}
