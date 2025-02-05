// product.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { product } from '@prisma/client';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    // search product
    @Get()
    async getAllProducts():Promise<product[]> {
        return this.productService.getProducts();
    }

    @Get(':p_name')
    async getProductByName(@Param('p_name') p_name:string) : Promise<product | null>
    {
        return this.productService.getProductByName(p_name);
    }

    // add product
    // @Post()
    // async addProducts(@Body() addProductDto: { name: string; description: string; price: number; type:string }): Promise<product> {
    //     return this.productService.addProducts(addProductDto);
    //     }
}
