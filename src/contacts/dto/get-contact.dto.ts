import {
  IsEmail,
  IsString,
  IsBoolean,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsMongoId,
  IsNumberString,
  IsBooleanString,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class getContactDto {
  @IsOptional()
  @IsString()
  readonly sortBy: string;

  @IsOptional()
  @IsString()
  readonly sortByDesc: string;

  @IsOptional()
  @IsString()
  readonly filter: string;

  @IsOptional()
  @IsNumberString()
  readonly page: string;

  @IsOptional()
  @IsBooleanString()
  readonly favorite: boolean;

  @IsOptional()
  @IsNumberString()
  readonly limit: string;
}
