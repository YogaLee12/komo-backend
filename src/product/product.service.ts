
import { Injectable } from '@nestjs/common';
import { product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

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

    //add new product
    async addProducts(
        data:{
            p_name:string;
            price: Decimal;
            type: string;
            intro: string;
            img:string | null;
        }
    ): Promise<product | null>{
        const productData = {
            p_name: data.p_name,
            price: data.price.toString(),
            type: data.type,
            intro: data.intro,
            img: data.img
        }
        return this.prisma.product.create({
            data: productData,
        });
    }

    //update product infor
    async updateProduct(
        id: number,
        data:{
            p_name:string;
            price: Decimal;
            type: string;
            intro: string;
            img:string | null;
        }
    ): Promise<product>{
        const productData = {
            p_name: data.p_name,
            price: data.price.toString(),
            type: data.type,
            intro: data.intro,
            img: data.img
        }
        return this.prisma.product.update({
            where:{id},
            data: productData,
        });
    }

    // delete product
    async deleteProduct(id:number) : Promise<product>{
        return this.prisma.product.delete({
            where:{id}
        });
    }


}
