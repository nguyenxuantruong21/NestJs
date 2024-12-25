import { IsEmail, IsNotEmpty } from 'class-validator';
// import { Unique } from 'src/rules/unique';

export class UpdateUserDto {
  name: string;
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;
  password: string;
}
