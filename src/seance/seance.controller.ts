import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { SeanceService } from './seance.service';
import { SeanceFormDto } from './dtos/seance_form.dto';
import { SeanceFormUpdateDto } from './dtos/seance_form_update.dto';

@Controller('seance')
export class SeanceController {

    constructor(
        private seanceService : SeanceService
      ) {}
    
      @Get(':id/film')
      getFilmOfSeance(@Param('id', ParseIntPipe) id : number) {
        return this.seanceService.getFilmOfSeance(id);
      }
    
      @Get(':id')
      getSeance(@Param('id', ParseIntPipe) id : number) {
        return this.seanceService.getSeance(id);
      }
    
      @Post()
      createSeance(@Body() dto : SeanceFormDto) {
        return this.seanceService.createSeance(dto);
      }
    
      @Patch(':id')
      updateSeance(
        @Param('id', ParseIntPipe) id : number,
        @Body() dto : SeanceFormUpdateDto
      ) {
        return this.seanceService.updateSeance(id, dto);
      }
    
      @Delete(':id')
      deleteSeance(
        @Param('id', ParseIntPipe) id : number,
      ) {
        return this.seanceService.deleteSeance(id);
      }
    

}
