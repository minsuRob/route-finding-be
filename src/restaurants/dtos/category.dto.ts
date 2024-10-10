import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Category } from '../entities/category.entity';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Restaurant } from '../entities/restaurant.entity';

@InputType() // fixme error why Int
export class CategoryInput extends PaginationInput {
  @Field(type => String)
  slug: string;
}
@ObjectType()
export class CategoryOutput extends PaginationOutput {
  @Field(type => Category, { nullable: true })
  category?: Category;
  @Field(type => Restaurant, { nullable: true })
  restaurants?: Restaurant[];
}
