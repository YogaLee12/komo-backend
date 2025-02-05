import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ProductService } from './products/product.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,PrismaService,ProductService],
})
export class AppModule {}
