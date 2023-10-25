import { Module } from '@nestjs/common';
import { SeanceService } from './seance.service';
import { SeanceController } from './seance.controller';

@Module({
  providers: [SeanceService],
  controllers: [SeanceController]
})
export class SeanceModule {}
