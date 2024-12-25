import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'Tên sản phẩm không được để trống.' })
  @Length(5, 50, {
    message: 'Tên sản phẩm phải từ 5 đến 50 ký tự.',
  })
  name: string;

  @IsOptional()
  @IsString({ message: 'Mô tả phải là chuỗi.' })
  @Length(20, 200, {
    message: 'Mô tả phải từ 20 đến 200 ký tự.',
  })
  description?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Giá sản phẩm phải là số.' })
  @IsPositive({ message: 'Giá sản phẩm phải lớn hơn 0.' })
  price: number;

  @IsOptional()
  @IsString({ message: 'Danh mục phải là chuỗi.' })
  @IsIn(['electronics', 'furniture', 'clothing'], {
    message:
      'Danh mục phải là một trong các giá trị sau: electronics, furniture, clothing.',
  })
  category: string;

  @IsOptional()
  @IsArray({ message: 'Tags phải là một mảng.' })
  @MaxLength(10, { each: true, message: 'Mỗi từ khóa không quá 10 ký tự.' })
  tags?: string[];
}
