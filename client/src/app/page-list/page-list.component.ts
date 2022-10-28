import { Component, OnDestroy, OnInit } from '@angular/core'
import { DragulaService } from 'ng2-dragula'
import { Subscription } from 'rxjs'
import { ToDo } from '../_interface/todo'

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

  constructor(public _dragulaService: DragulaService) {
    this.openToDos = []
    this.showOpenToDos = true
    this.doneToDos = []
    this.showDoneToDos = true

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
    }
  }
}
