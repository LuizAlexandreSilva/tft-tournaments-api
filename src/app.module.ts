import { Module } from '@nestjs/common';
import { DatabaseModule } from 'shared/database/database.module';
import { UserModule } from 'modules/users/user.module';
import { TournamentModule } from 'modules/tournaments/tournament.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DatabaseModule, UserModule, TournamentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
