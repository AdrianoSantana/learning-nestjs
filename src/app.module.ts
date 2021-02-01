import { Module } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    BackofficeModule,
    MongooseModule.forRoot('mongodb+srv://ans3:679852@cluster0.3oys9.mongodb.net/petshop?retryWrites=true&w=majority', { 'useCreateIndex': true })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
