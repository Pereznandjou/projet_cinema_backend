// src/films/entities/film.entity.ts

import { Prisma } from '@prisma/client';

export class Film implements Prisma.FilmUncheckedCreateInput {
  id?: number;
  nom: string;
  resume: string;
  categorie:  string | any;
  duree: string;
  realisateur: string | null;
  acteur_principal: string | null;
  imageUrl?: string | null;
  imageCloudinaryPublicId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Prisma.FilmUncheckedCreateInput) {
    this.id = data.id;
    this.nom = data.nom;
    this.resume = data.resume;
    this.categorie = Array.isArray(data.categorie) ? data.categorie : [data.categorie]; // Mise à jour ici
 
    this.duree = data.duree;
    this.realisateur = data.realisateur || null;
    this.acteur_principal = data.acteur_principal || null;
    this.imageUrl = data.imageUrl || null;
    this.imageCloudinaryPublicId = data.imageCloudinaryPublicId || null;
    this.createdAt = data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt);
    this.updatedAt = data.updatedAt instanceof Date ? data.updatedAt : new Date(data.updatedAt);

  }
    seances?: Prisma.SeanceUncheckedCreateNestedManyWithoutFilmInput;
}
