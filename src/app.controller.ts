import { Controller, Get, Post } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/user')
  getAllUser() {
    return this.appService.getAllUser()
  }

  @Post('/user')
  createUser() {
    return this.appService.createUser()
  }

  @MessagePattern('create-user')
  async createUserByNats(@Payload() data: any) {
    console.log('user-created', data)
    this.appService.createUser()
  }

}
