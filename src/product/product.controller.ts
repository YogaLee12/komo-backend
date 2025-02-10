// product.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductService } from './product.service';
import { product } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { addProductsDto } from './dto/add-product.dto';
import { updataProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import * as multer from 'multer';

@ApiTags('Products')
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    // show all products
    @Get()
    async getAllProducts():Promise<product[]> {
        return this.productService.getProducts();
    }
    // get product by name
    @Get(':p_name')
    async getProductByName(@Param('p_name') p_name:string) : Promise<product | null>
    {
        return this.productService.getProductByName(p_name);
    }


    // add new products
    @Post()
    @ApiOperation( {summary: 'Add new product.'} )
    @ApiResponse({ status: 201, description: 'Product added' })
    @UseInterceptors(
        FileInterceptor('img', {
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                const dir = './productImg';
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                cb(null, dir); // 文件保存的文件夹
                },
                filename: (req, file, cb) => {
                const pName = req.body.p_name;
                const ext = path.extname(file.originalname); // 获取文件扩展名
                cb(null, `${pName}${ext}`); // 使用 p_name 作为文件名，后跟文件扩展名
                },
            }),
            }),
    )

    async addProduct(
        @Body() addProductsDto: addProductsDto,
        @UploadedFile() image: Express.Multer.File
    ) {
        if (image){
            addProductsDto.img = image.filename;
        }
        return this.productService.addProducts(addProductsDto);
    }

    // update product information
    @Put(':id')
    @ApiOperation( {summary:'update product information.'} )
    updateProduct(@Param('id') id: string, @Body() updateProductDto: updataProductDto) {
        return this.productService.updateProduct(Number(id), updateProductDto);
    }

    // delete product
    @Delete(':id')
    @ApiOperation( {summary:'product delete.'} )
    deleteProduct(@Param('id') id: string){
        return this.productService.deleteProduct(Number(id))
    }

}
