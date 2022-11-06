import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ToDo } from 'src/app/_interface/todo'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private databaseUri =
    environment.NG_APP_DATABASE_URI || 'http://localhost:8081'

  constructor(private _httpClient: HttpClient) {}

  /**
   * POST one ToDo to the Database.
   * @returns {ToDo} toDo
   */
  public createOneToDo(newToDo: ToDo): Observable<ToDo> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    const httpOptions = {
      headers
    }

    const httpBody = { ...newToDo }

    return this._httpClient.post<ToDo>(
      `${this.databaseUri}/todo`,
      httpBody,
      httpOptions
    )
  }

  /**
   * GET all ToDos from the Database.
   * @returns {ToDo[]} toDos
   */
  public getAllToDos(): Observable<ToDo[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    const httpOptions = {
      headers
    }

    return this._httpClient.get<ToDo[]>(`${this.databaseUri}/todo`, httpOptions)
  }

  /**
   * GET one ToDo from the Database.
   * @returns {ToDo} toDo
   */
  public getOneToDos(id: number): Observable<ToDo> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    const httpOptions = {
      headers
    }

    return this._httpClient.get<ToDo>(
      `${this.databaseUri}/todo/${id}`,
      httpOptions
    )
  }

  /**
   * PUT new Data in a existing ToDo on the Database.
   * @returns {ToDo} toDo
   */
  public updateOneToDo(
    id: number | undefined,
    newToDo: ToDo
  ): Observable<ToDo> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    const httpOptions = {
      headers
    }

    const httpBody = { ...newToDo }

    return this._httpClient.put<ToDo>(
      `${this.databaseUri}/todo/${id}`,
      httpBody,
      httpOptions
    )
  }

  /**
   * DELETE a ToDo in the Database.
   * @returns {ToDo} toDo
   */
  public deleteOneToDo(id: number | undefined): Observable<ToDo> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    const httpOptions = {
      headers
    }

    return this._httpClient.delete<ToDo>(
      `${this.databaseUri}/todo/${id}`,
      httpOptions
    )
  }
}
