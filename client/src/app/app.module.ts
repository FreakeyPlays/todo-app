import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { DragulaModule } from 'ng2-dragula'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { PageListComponent } from './page-list/page-list.component'
import { TemplateHeaderComponent } from './_template/template-header/template-header.component'
import { TemplateTodoFormComponent } from './_template/template-todo-form/template-todo-form.component'
import { TemplateTodoComponent } from './_template/template-todo/template-todo.component'

@NgModule({
  declarations: [
    AppComponent,
    PageListComponent,
    TemplateHeaderComponent,
    TemplateTodoFormComponent,
    TemplateTodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragulaModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
