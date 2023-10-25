import { PartialType } from "@nestjs/mapped-types";
import { SeanceFormDto } from "./seance_form.dto";

export class SeanceFormUpdateDto extends PartialType(SeanceFormDto) {}