import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  @Query((returns) => Boolean)
  isPizzaGood(): Boolean {
    return true;
  }
}
