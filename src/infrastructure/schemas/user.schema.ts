import { Column, Entity, OneToMany, ManyToMany, JoinTable, Index } from 'typeorm';
import { Role } from './role.schema';
import { BaseSchema } from './base.schema';

@Entity({ name: 'users' })
export class User extends BaseSchema {
    @Column()
    @Index({ unique: true })
    username: string = '';

    @Column({ nullable: true })
    full_name: string = '';

    @Column({ nullable: true })
    email: string = '';

    @Column({ nullable: true })
    last_login?: Date;

    @Column({ nullable: true })
    hash_refresh_token: string = '';

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({
        name: 'users_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id' },
    })
    roles: Role[] | undefined;
}
