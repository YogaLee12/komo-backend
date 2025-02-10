import { PartialType } from '@nestjs/mapped-types';
import { addProductsDto } from './add-product.dto';


export class updataProductDto extends PartialType(addProductsDto){}
