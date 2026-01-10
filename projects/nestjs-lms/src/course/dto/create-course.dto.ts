import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCourseDto {

  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsNotEmpty({ message: 'Level is required' })
  @IsString({ message: 'Level must be a string' })
  level: string;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price must be a number' })
  price: number;
}
