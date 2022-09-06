import { Injectable, Logger } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;
export type UserModules = {
  name: string;
  access: { add: number; delete: number; edit: number; view: number };
};

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john@admin.com',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria@tamu.com',
      password: 'guesss',
    },
    {
      userId: 3,
      username: 'admin@admin.com',
      password: 'password',
    },
  ];

  private readonly permissions = [
    {
      userId: 1,
      role: 'admin',
      modules: [
        {
          name: 'dashboard',
          slug: 'dashboard',
          access: { add: 1, delete: 1, edit: 1, view: 1 },
        },
        {
          name: 'profile',
          slug: 'profile',
          access: { add: 1, delete: 1, edit: 1, view: 0 },
        },
        {
          name: 'report',
          slug: 'report',
          access: { add: 1, delete: 1, edit: 1, view: 1 },
        },
      ],
    },
    {
      userId: 2,
      role: 'guest',
      modules: [
        {
          name: 'dashboard',
          slug: 'dashboard',
          access: { add: 0, delete: 0, edit: 0, view: 0 },
        },
        {
          name: 'profile',
          slug: 'profile',
          access: { add: 0, delete: 0, edit: 0, view: 0 },
        },
        {
          name: 'report',
          slug: 'report',
          access: { add: 0, delete: 0, edit: 0, view: 0 },
        },
      ],
    },
    {
      userId: 3,
      role: 'admin',
      modules: [
        {
          name: 'dashboard',
          slug: 'dashboard',
          access: { add: 1, delete: 1, edit: 1, view: 1 },
        },
        {
          name: 'profile',
          slug: 'profile',
          access: { add: 1, delete: 1, edit: 1, view: 0 },
        },
        {
          name: 'releases/upcoming',
          slug: 'releases-upcoming',
          access: { add: 1, delete: 1, edit: 1, view: 1 },
        },
        {
          name: 'releases/schedule',
          slug: 'releases-schedule',
          access: { add: 1, delete: 1, edit: 1, view: 1 },
        },
        {
          name: 'analytics',
          slug: 'analytics',
          access: { add: 1, delete: 1, edit: 1, view: 1 },
        },
      ],
    },
  ];
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async collectPermission(
    userId: number,
    page: string,
    list: boolean
  ): Promise<User | undefined> {
    let modules: { name: string; slug: string }[];
    const userData = this.permissions.find(
      (permission) => permission.userId === userId
    );
    if (list) {
      modules = userData.modules
        .filter((each) => each.access.view)
        .map((each) => ({ name: each.name, slug: each.slug }));
    }
    const isAllowed: UserModules = userData.modules.filter(
      (access) => access.name === page
    )[0];
    return list ? { modules, access: isAllowed?.access } : isAllowed?.access;
  }
}
