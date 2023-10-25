import { IsDate, IsISO8601, IsInt, IsNotEmpty, IsString, MinLength, ValidateIf } from "class-validator"

export class SeanceFormDto {
  @IsInt()
  @ValidateIf((object, value) => value !== null)
  totalPlace

  @IsISO8601()
  @ValidateIf((object, value) => value !== null)
  dateSeance

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  lieu

  @IsInt()
  @ValidateIf((object, value) => value !== null)
  filmId
  
}