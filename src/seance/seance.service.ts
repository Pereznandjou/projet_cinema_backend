import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SeanceFormDto } from './dtos/seance_form.dto';
import { SeanceFormUpdateDto } from './dtos/seance_form_update.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class SeanceService {

    constructor(
        private prisma: PrismaService,
        
      ) { }
    
      async createSeance(dto: SeanceFormDto) {
        const seance = await this.prisma.seance.create({
          data: {
            totalPlace: dto.totalPlace,
            dateSeance: dto.dateSeance,
            lieu: dto.lieu,
            filmId: dto.filmId
          }
        })
        return seance;
      }
    
      async getSeance(id: number) {
        const seance = await this.prisma.seance.findUnique({
          where: { id: id },
          //include: { author: true }
        });
        if (!seance) throw new NotFoundException('Seance not found.');
        return seance;
      }
    
      async getFilmOfSeance(id: number) {
        const seance = await this.prisma.seance.findUnique({
          where: { id: id },
          include: { film: true }
        });
        if (!seance) throw new NotFoundException('Seance not found.');
        return seance.film;
      }
    
      async updateSeance(id: number, dto: SeanceFormUpdateDto) {
        const seance = await this.prisma.seance.update({
          where: { id: id },
          data: { ...dto }
        });
    
        return seance;
      }
    
      async deleteSeance(id: number) {
        try {
          await this.prisma.seance.delete({
            where: { id: id }
          });
        } catch (e) {
          if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === 'P2025') {
              throw new NotFoundException('Seance not found.');
            }
            console.log(e);
          }
        }
    
    
        return { status: 'DELETED' }
      }
    
    
}
