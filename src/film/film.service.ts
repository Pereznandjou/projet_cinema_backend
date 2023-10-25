import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilmFormDto } from './dtos/film_form.dto';
import { FilmFormUpdateDto } from './dtos/film_form_update';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Film } from '@prisma/client';

@Injectable()
export class FilmService {
    //cloudinaryService: any;

    constructor(
        private prisma : PrismaService,
        private cloudinaryService : CloudinaryService
      ) {}
      async createFilm(dto : FilmFormDto) {
        const film = await this.prisma.film.create({
          data: {
            nom: dto.nom,
            resume: dto.resume,
            categorie: dto.categorie,
            duree : dto.duree,
            realisateur: dto.realisateur,
            acteur_principal: dto.acteur_principal
          }
        })
        return film;
      }
    
      async getFilm(id : number) {
        const film = await this.prisma.film.findUnique({
          where: {id : id},
          //include: { author: true }
        });
        if (!film) throw new NotFoundException('Flm not found.');
        return film;
      }

      async getFilms(): Promise<Film[]> {
        const films = await this.prisma.film.findMany();
        return films;
      }
    
      // async getSeanceOfFilm(id : number) {
      //   const film = await this.prisma.film.findUnique({
      //     where: {id : id},
      //     include: { seance: true }
      //   });
      //   if (!film) throw new NotFoundException('Film not found.');
      //   return film.seance;
      // }
    
      async updateFilm(id : number, dto: FilmFormUpdateDto) {
        const film = await this.prisma.film.update({
          where: { id : id },
          data: { ...dto }
        });
    
        return film;
      }
    
      async deleteFilm(id: number) {
        try {
          await this.prisma.film.delete({
            where: {id : id}
          });
        } catch (e) {
          if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === 'P2025') {
              throw new NotFoundException('Film not found.');
            }
            console.log(e);
          }
        }
    
    
        return { status : 'DELETED' }
      }
    
      async uplaodFilmImage(filmId: number, file: Express.Multer.File) {

        if (!file) {
    
          throw new NotFoundException('No file');
    
        }
        const filmR = await this.getFilm(filmId);
        //livre.imageCloudinaryPublicId 
        try {
          const modif = await this.cloudinaryService.deleteFile(filmR.imageCloudinaryPublicId);

        } catch(e) {}
    
    
        const uploadedFile = await this.cloudinaryService.uploadFile(file);
    
        console.log(uploadedFile);
    
        const film = await this.prisma.film.update({
    
          where: { id: filmId },
    
    
          data: {
    
            imageUrl: uploadedFile.url,
    
            imageCloudinaryPublicId: uploadedFile.public_id
    
          }
    
        })
    
        return film
    
      }

}
