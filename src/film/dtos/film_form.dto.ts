import { IsNotEmpty, IsString, MinLength, ValidateIf } from "class-validator"

export class FilmFormDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  nom

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  resume

  @IsString()
  @ValidateIf((object, value) => value !== null)
  categorie

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  duree

  @IsString()
  @ValidateIf((object, value) => value !== null)
  realisateur
  
  @IsString()
  @ValidateIf((object, value) => value !== null)
  acteur_principal

  
}