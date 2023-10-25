import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FilmModule } from './film/film.module';
import { SeanceModule } from './seance/seance.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, AuthModule, FilmModule, SeanceModule, CloudinaryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
