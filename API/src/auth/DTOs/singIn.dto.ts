import { IsNotEmpty } from "class-validator";

export class SingInDto {
    
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    pass: string;
}