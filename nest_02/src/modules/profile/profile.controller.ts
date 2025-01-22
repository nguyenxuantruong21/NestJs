import { Body, Controller, Delete, Param, Patch } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch(':id')
  updateByUserId(@Param('id') id: number, @Body() bodyUpdate: any) {
    return this.profileService.updateByUserId(+id, bodyUpdate);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.profileService.deleteById(+id);
  }
}
