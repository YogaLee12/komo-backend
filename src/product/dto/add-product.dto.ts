import {IsNotEmpty, IsString, IsNumber, IsOptional} from 'class-validator'

export class addProductsDto{
    @IsNotEmpty()
    @IsString()
    p_name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsString()
    @IsOptional()
    intro?: string;

    @IsOptional()
    @IsString()
    img?: string;

}