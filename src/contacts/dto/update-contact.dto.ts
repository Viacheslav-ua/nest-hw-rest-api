import {
  IsEmail,
  IsString,
  IsBoolean,
  IsNotEmpty,
  MinLength,
  MaxLength,
  isMongoId,
  isNumberString,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateContactDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly name: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsBoolean()
  readonly favorite: boolean;
}
