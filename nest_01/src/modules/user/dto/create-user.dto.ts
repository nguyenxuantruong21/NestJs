import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { Unique } from 'src/rules/unique';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Tên bắt buộc phải nhập' })
  @IsString({ message: 'Tên phải là chuỗi' })
  name: string;

  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsString({ message: 'Email phải là chuỗi' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @Validate(Unique, { message: 'Email đã tồn tại' })
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsString({ message: 'Mật khẩu là chuỗi' })
  @MinLength(6, { message: 'Mật khẩu phải có 6 ký tự' })
  password: string;
}
