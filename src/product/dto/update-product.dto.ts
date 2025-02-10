import { PartialType } from '@nestjs/mapped-types';
import { addProductsDto } from './add-product.dto';


export class updateProductDto extends PartialType(addProductsDto){}
