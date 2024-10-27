import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CoreEntity } from 'src/common/entities/core.entity';
import { InternalServerErrorException } from '@nestjs/common';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

export enum UserRole {
  Client = 'Client',
  Owner = 'Owner',
  Delivery = 'Delivery',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column({ select: false })
  @Field((type) => String)
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field((type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ default: false })
  @Field((type) => Boolean)
  @IsBoolean()
  verified: boolean;

  @Field((type) => [Restaurant])
  @OneToMany((type) => Restaurant, (restaurant) => restaurant.owner)
  restaurants: Restaurant[];

  // climbing data

  @Field((type) => Number)
  @Column({ default: 170 })
  @IsNumber()
  reach: number;

  @Field((type) => Number)
  @Column({ default: 170 })
  @IsNumber()
  height: number;

  @Field((type) => Number, { nullable: true })
  @Column({ default: 0 })
  @IsNumber()
  follower: number;

  @Field((type) => Number, { nullable: true })
  @Column({ default: 0 })
  @IsNumber()
  following: number;

  @Field((type) => String, { nullable: true })
  @Column({ default: '' })
  @IsString()
  instaId: string;

  @Field((type) => Date, { nullable: true })
  @IsDate()
  @UpdateDateColumn()
  startedAt: Date; // clmbing stared

  @Column({ default: true })
  @Field((type) => Boolean)
  @IsBoolean()
  isAllowAuth: boolean; // auth

  // home zym

  // crew object

  // avatar object

  // @Field((type) => [Follower])
  // @OneToOne((type) => Follower, (follower) => follower.owner)
  // follower: Follower[];

  //need following

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
