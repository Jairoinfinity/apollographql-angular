import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

const QueryGetUsers = gql`
  query QueryGetUsers {
    users{
      _id
      firstname
      lastname
      age
    }
  }
`;

@Component({
  selector: 'app-query-data',
  templateUrl: './query-data.component.html',
  styleUrls: ['./query-data.component.css']
})
export class QueryDataComponent implements OnInit {
  loading: boolean;
  userData: any = [];
  private querySubscription: Subscription;
  showForm: boolean = false;
  name: String;
  lastname: String;
  age: number;
  id: String;
  public formGroup: FormGroup;

  constructor(private apollo: Apollo,private formBuilder: FormBuilder) { }

  ngOnInit() {
    
  }

  showData(){
    this.querySubscription = this.apollo.watchQuery<any>({
      query: QueryGetUsers
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.userData = data.users;
      });
  }

  deleteUser(id){
    let deleteUserById = gql`
    mutation{
      deleteUser(_id: "${id}"){
        _id
      }
    }
    `;

    this.apollo.mutate({
      mutation: deleteUserById
    }).subscribe((data) => {
      alert("The user has been deleted");
      this.showData();
    });

  }

  showFromData(item){
    this.showForm = true;
    this.name = item.firstname;
    this.lastname = item.lastname;
    this.age = item.age;
    this.id = item._id;

    this.formGroup = this.formBuilder.group({
      firstname: this.name,
      surname: this.lastname,
      ageData: this.age
    });
  }

  // editUser(){
  //   let editUser = gql`
  //   mutation{
  //     updateUser(_id: "${this.id}", input:{
  //       firstname: "${this.formGroup.get(firstname)}"
  //       lastname: "${this.formGroup.get(surname)}"
  //       age: "${this.formGroup.get(ageData)}"
  //     }){
  //       _id
  //     }
  //   }
  //   `;

  //   this.apollo.mutate({
  //     mutation: editUser
  //   }).subscribe((data) => {
  //     alert("The user has been edited");
  //     this.showForm = false;
  //     this.showData();
  //   });
  // }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

}
