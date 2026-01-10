import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    const result = await this.courseService.create(createCourseDto);

    return {
      message: 'Course created successfully',
      data: result,
    }
  }

  @Get()
  async findAll() {
    const result = await this.courseService.findAll();

    return {
      message: 'Courses retrieved successfully',
      data: result,
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.courseService.findOne(id);

    return {
      message: 'Course retrieved successfully',
      data: result,
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    const result = await this.courseService.update(id, updateCourseDto);

    return {
      message: 'Course updated successfully',
      data: result,
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.courseService.remove(id);

    return {
      message: 'Course removed successfully',
      data: result,
    }
  }
}
