import { Module } from '@nestjs/common';
import { DatabaseModule } from 'shared/database/database.module';
import { UserModule } from 'modules/users/user.module';
import { TournamentModule } from 'modules/tournaments/tournament.module';
import { AuthModule } from 'modules/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, TournamentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
