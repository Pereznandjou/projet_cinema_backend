import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilmFormDto } from './dtos/film_form.dto';
import { FilmFormUpdateDto } from './dtos/film_form_update';
import { FilmService } from './film.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Film } from '@prisma/client';

@Controller('film')
export class FilmController {

  constructor(
    private filmService: FilmService
  ) { }

  // @Get(':id/seance')
  // getSeanceOfFilm(@Param('id', ParseIntPipe) id : number) {
  //   return this.filmService.getSeanceOfFilm(id);
  // }
  @Get()
  async getFilms(): Promise<Film[]> {
    return this.filmService.getFilms();
  }

  @Get(':id')
  getFilm(@Param('id', ParseIntPipe) id: number) {
    return this.filmService.getFilm(id);
  }

  @Post()
  createFilm(@Body() dto: FilmFormDto) {
    return this.filmService.createFilm(dto);
  }

  @Patch(':id')
  updateFilm(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: FilmFormUpdateDto
  ) {
    return this.filmService.updateFilm(id, dto);
  }

  @Delete(':id')
  deleteFilm(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.filmService.deleteFilm(id);
  }
  @Post(':id/upload-image')

  @UseInterceptors(FileInterceptor('file'))

  uplaodFilmImage(@UploadedFile() file: Express.Multer.File, @Param('id', ParseIntPipe) filmId: number) {

    return this.filmService.uplaodFilmImage(filmId, file);

  }


}
