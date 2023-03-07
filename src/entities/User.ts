// import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	OneToMany,
} from 'typeorm';
import { Field } from 'type-graphql';
import { Post } from './Post';

@Entity('user-entity')
export class User extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column({ unique: true })
	username!: string;

	@Column()
	password!: string;

	@OneToMany(() => Post, (post) => post.creator)
	posts: Post[];

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;
}
