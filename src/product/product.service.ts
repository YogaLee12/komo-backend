
import { Injectable, NotFoundException } from '@nestjs/common';
import { product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { updateProductDto } from './dto/update-product.dto';
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
    async updateProduct(id:number, updateProductDto:updateProductDto, file? : Express.Multer.File){
        await this.findOne(id); // make sure the product is exist
        const existingProduct = await this.prisma.product.findUnique({ where: { id } });
            if (!existingProduct) {
                throw new Error(`Product with ID ${id} not found`);
            }

        return this.prisma.product.update({
            where:{id},
            data: {
                p_name: updateProductDto.p_name ?? existingProduct.p_name,
                price: updateProductDto.price !== undefined ? new Decimal(updateProductDto.price) : existingProduct.price,
                type: updateProductDto.type ?? existingProduct.type,
                intro: updateProductDto.intro ?? existingProduct.intro,
                img: file ? file.filename : existingProduct.img,
            }
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
