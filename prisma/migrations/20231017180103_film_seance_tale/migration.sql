-- CreateTable
CREATE TABLE "Seance" (
    "id" SERIAL NOT NULL,
    "totalPlace" INTEGER NOT NULL,
    "dateSeance" TIMESTAMP(3) NOT NULL,
    "lieu" TEXT NOT NULL,
    "filmId" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Seance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Film" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "resume" TEXT NOT NULL,
    "categorie" TEXT NOT NULL,
    "duree" TEXT NOT NULL,
    "realisateur" TEXT NOT NULL,
    "acteur_principal" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Film_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Seance" ADD CONSTRAINT "Seance_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film"("id") ON DELETE SET NULL ON UPDATE CASCADE;
