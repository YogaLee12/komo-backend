
import { Injectable, NotFoundException } from '@nestjs/common';
import { product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { updataProductDto } from './dto/update-product.dto';
import { addProductsDto } from './dto/add-product.dto';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    // Get all products
    async getProducts(): Promise<product[]> {
        return this.prisma.product.findMany();
    }

    // Get products by name
    async getProductByName(p_name :string ): Promise<product | null> {
        return this.prisma.product.findUnique({
            where:{p_name},
        });
    }
    // find one product
    async findOne(id:number){
        const product = await this.prisma.product.findUnique({where:{id}});
        if (!product){
            throw new NotFoundException('product with ID ${id} not found')
        }
        return product
    }

    //add new product
    async addProducts(addProductsDto:addProductsDto){
        return this.prisma.product.create({
            data:{
                p_name: addProductsDto.p_name,
                price: new Decimal(addProductsDto.price),  
                type: addProductsDto.type,
                intro: addProductsDto.intro || null,
                img: addProductsDto.img || null,  
            },
                                        });
    }

    //update product infor
    async updateProduct(id:number, updataProductDto:updataProductDto){
        await this.findOne(id); // make sure the product is exist
        return this.prisma.product.update({
            where:{id},
            data: updataProductDto,
        })
    }

    // delete product
    async deleteProduct(id:number) : Promise<product>{
        await this.findOne(id); // make sure the product is exist
        return this.prisma.product.delete({
            where:{id}
        });
    }


}
