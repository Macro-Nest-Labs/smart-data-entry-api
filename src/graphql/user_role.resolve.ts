import { ApolloError } from 'apollo-server-errors';
import UserRoles from 'supertokens-node/recipe/userroles';

import { CreateArgs, DataStoreError, ForbiddenError, QueryArgs } from '../common/types';
import { AssignUserRole, CreateUserRole, RemoveUserRole, UserRole, WhereOptionsUserRole } from '../generated/graphql';
import { formatDataStoreError } from '../utils/formatDataStoreError';
import { GraphQLRequestContextWithAuth } from './../common/types';

export const resolvers = {
  Query: {
    async UserRolesAll(): Promise<UserRole[]> {
      const data = await UserRoles.getAllRoles();
      const rolesWithPermissionsPromises = data.roles.map(async (role) => {
        try {
          const response = await UserRoles.getPermissionsForRole(role);
          if (response.status === 'OK') {
            return { name: role, permissions: response.permissions };
          } else {
            console.error(`Failed to get permissions for role ${role}`);
            return null;
          }
        } catch (error) {
          console.error(`Error fetching permissions for role ${role}:`, error);
          return null;
        }
      });

      const rolesWithPermissions = (await Promise.all(rolesWithPermissionsPromises)).filter(Boolean);

      return rolesWithPermissions;
    },
    async UserRole(parent: never, args: QueryArgs<UserRole, WhereOptionsUserRole>): Promise<UserRole> {
      if (!args.where || Object.keys(args.where).length === 0) {
        throw new ApolloError('A "where" condition is required.', 'WHERE_CONDITION_REQUIRED');
      }

      const roleName = args.where.name;
      const data = await UserRoles.getPermissionsForRole(roleName);
      let role: UserRole;
      if (data.status === 'OK') {
        role = { name: roleName, permissions: data.permissions };
        return role;
      }

      throw new ApolloError('Unknown role', 'UNKNOWN_ROLE_ERROR');
    },
  },
  Mutation: {
    async createUserRole(parent: never, args: CreateArgs<CreateUserRole>, context: GraphQLRequestContextWithAuth): Promise<boolean> {
      if (!context.auth.canMutate) {
        throw ForbiddenError('Unauthorized');
      }
      if (!context.auth.authData.userRoles.includes('admin')) {
        throw new ApolloError('You must be an Admin to create a User Role ', 'UNAUTHORIZED');
      }
      if (!args.item || Object.keys(args.item).length === 0) {
        throw new ApolloError('An "item" CreateUserRole object is required.', 'CREATE_ARGS_REQUIRED');
      }

      const { name: roleName, permissions } = args.item;

      try {
        const response = await UserRoles.createNewRoleOrAddPermissions(roleName, permissions);

        if (response.createdNewRole === false) {
          throw new ApolloError(`A role with name ${roleName} already exists!`, 'ROLE_EXISTS_ERROR');
        }

        return response.createdNewRole;
      } catch (error) {
        console.error(`UserRole.create roleName=[${roleName}]`, error);
        throw DataStoreError(formatDataStoreError(error, 'Error creating UserRole'));
      }
    },
    async deleteUserRole(parent: never, args: { name: string }, context: GraphQLRequestContextWithAuth): Promise<boolean> {
      if (!context.auth.canMutate) {
        throw ForbiddenError('Unauthorized');
      }
      if (!context.auth.authData.userRoles.includes('admin')) {
        throw new ApolloError('You must be an Admin to delete a User Role ', 'UNAUTHORIZED');
      }
      if (!args.name) {
        throw new ApolloError('A Role Name is required.', 'DELETE_ARGS_REQUIRED');
      }
      const { name: roleName } = args;

      try {
        const response = await UserRoles.deleteRole(roleName);

        if (!response.didRoleExist) {
          throw new ApolloError(`Role ${roleName} does not exist!`, 'ROLE_EXISTS_ERROR');
        }

        return response.didRoleExist;
      } catch (error) {
        console.error(`UserRole.delete [${roleName}]`, error);
        throw DataStoreError(formatDataStoreError(error, 'Error deleting Receipt'));
      }
    },
    async assignRoleToUser(parent: never, args: { item: AssignUserRole }, context: GraphQLRequestContextWithAuth): Promise<boolean> {
      if (!context.auth.canMutate) {
        throw ForbiddenError('Unauthorized');
      }
      if (!context.auth.authData.userRoles.includes('admin')) {
        throw new ApolloError('You must be an Admin to assign Role to an user', 'UNAUTHORIZED');
      }
      if (!args.item || Object.keys(args.item).length === 0) {
        throw new ApolloError('An "item" AssignUserRole object is required.', 'ASSIGN_USER_ROLE_ARGS_REQUIRED');
      }

      const { roleName, userId } = args.item;

      try {
        const response = await UserRoles.addRoleToUser('public', userId, roleName);

        if (response.status === 'UNKNOWN_ROLE_ERROR') {
          throw new ApolloError(`Role ${roleName} does not exist!`, 'ROLE_EXISTS_ERROR');
        }

        if (response.didUserAlreadyHaveRole === true) {
          throw new ApolloError(`User ${userId} already had the role ${roleName}!`, 'ROLE_EXISTS_ERROR');
        }

        return response.status === 'OK';
      } catch (error) {
        console.error(`UserRole.assignRoleToUser roleName=[${roleName}]`, error);
        throw DataStoreError(formatDataStoreError(error, 'Error creating UserRole'));
      }
    },
    async removeRoleFromUser(parent: never, args: { item: RemoveUserRole }, context: GraphQLRequestContextWithAuth): Promise<boolean> {
      if (!context.auth.canMutate) {
        throw ForbiddenError('Unauthorized');
      }
      if (!context.auth.authData.userRoles.includes('admin')) {
        throw new ApolloError('You must be an Admin to remove Role from an user', 'UNAUTHORIZED');
      }
      if (!args.item || Object.keys(args.item).length === 0) {
        throw new ApolloError('An "item" RemoveUserRole object is required.', 'REMOVE_USER_ROLE_ARGS_REQUIRED');
      }

      const { roleName, userId } = args.item;

      try {
        const response = await UserRoles.removeUserRole('public', userId, roleName);

        if (response.status === 'UNKNOWN_ROLE_ERROR') {
          throw new ApolloError(`Role ${roleName} does not exist!`, 'ROLE_EXISTS_ERROR');
        }

        if (response.didUserHaveRole === false) {
          throw new ApolloError(`User ${userId} was never assigned the role ${roleName}!`, 'ROLE_EXISTS_ERROR');
        }

        return response.status === 'OK';
      } catch (error) {
        console.error(`UserRole.removeRoleFromUser roleName=[${roleName}]`, error);
        throw DataStoreError(formatDataStoreError(error, 'Error creating UserRole'));
      }
    },
  },
};
