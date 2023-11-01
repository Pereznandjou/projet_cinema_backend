/*
  Warnings:

  - The `categorie` column on the `Film` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Film" ALTER COLUMN "nom" DROP NOT NULL,
ALTER COLUMN "resume" DROP NOT NULL,
DROP COLUMN "categorie",
ADD COLUMN     "categorie" TEXT[],
ALTER COLUMN "duree" DROP NOT NULL,
ALTER COLUMN "realisateur" DROP NOT NULL,
ALTER COLUMN "acteur_principal" DROP NOT NULL;
