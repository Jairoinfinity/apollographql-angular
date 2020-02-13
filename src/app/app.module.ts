import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql/graphql.module';
import { HttpClientModule } from '@angular/common/http';

import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { QueryDataComponent } from './components/query-data/query-data.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { ModUserComponent } from './components/mod-user/mod-user.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    QueryDataComponent,
    AddUserComponent,
    DeleteUserComponent,
    ModUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: "http://localhost:3000/graphql"
        })
      }
    },
    deps: [HttpLink]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
