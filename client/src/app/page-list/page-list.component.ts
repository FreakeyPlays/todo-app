import { Component, OnInit } from '@angular/core'
import { ToDo } from '../_interface/todo'

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass']
})
export class PageListComponent implements OnInit {
  public openToDos: Array<ToDo>
  public showOpenToDos: boolean
  public doneToDos: Array<ToDo>
  public showDoneToDos: boolean

  constructor() {
    this.openToDos = []
    this.showOpenToDos = true
    this.doneToDos = []
    this.showDoneToDos = true
  }

  ngOnInit(): void {}
}
