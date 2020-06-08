import { Module } from '@nestjs/common';
import { DatabaseModule } from 'shared/database/database.module';
import { UserModule } from 'modules/users/user.module';
import { TournamentModule } from 'modules/tournaments/tournament.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [DatabaseModule, UserModule, TournamentModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
