import { Module } from '@nestjs/common';
import { UserActionService } from './user-actions.service';
import { UserActionController } from './user-actions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserActionService],
  controllers: [UserActionController],
})
export class UserActionModule {}
