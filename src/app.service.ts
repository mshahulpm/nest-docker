import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './models/user';

@Injectable()
export class AppService {


  constructor(@InjectModel(User.name) private USER: Model<UserDocument>) { }

  getHello(): string {
    return `
    <h2>Welcome to Nest devops</h2>

    <button onclick="createUser()">Create a random user</button>
    <br>
    <br>
    <br>
    <a href='/user'>all users</a>
    <script>
   async function createUser(){
    const res = await fetch('/user',{
      method:'POST'
    })
    const data = await res.json() 
    console.log(data) 
    alert('user created')
    }
    </script>
    `;
  }

  getAllUser() {
    return this.USER.find()
  }

  createUser() {
    const user = {
      name: "user " + Date.now(),
      age: Math.floor((Math.random() * 75) + 1)
    }
    return this.USER.create(user)
  }
}
