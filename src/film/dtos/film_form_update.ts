import { PartialType } from "@nestjs/mapped-types";
import { FilmFormDto } from "./film_form.dto";

export class FilmFormUpdateDto extends PartialType(FilmFormDto) {}