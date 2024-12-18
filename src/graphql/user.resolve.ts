import { ApolloError } from 'apollo-server-errors';
import UserMetadata from 'supertokens-node/recipe/usermetadata';
import UserRoles from 'supertokens-node/recipe/userroles';

import { QueryArgs } from '../common/types';
import { User, WhereOptionsUser } from '../generated/graphql';

export const resolvers = {
  Query: {
    async User(parent: never, args: QueryArgs<User, WhereOptionsUser>): Promise<User> {
      if (!args.where || Object.keys(args.where).length === 0) {
        throw new ApolloError('A "where" condition is required.', 'WHERE_CONDITION_REQUIRED');
      }

      const userId = args.where.userId;

      const userMetadata = await UserMetadata.getUserMetadata(userId);

      const firstName = userMetadata.metadata?.first_name ?? null;
      const lastName = userMetadata.metadata?.last_name ?? null;

      const rolesResponse = await UserRoles.getRolesForUser('public', userId);
      const rolesWithPermissionsPromises = rolesResponse.roles.map(async (role) => {
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

      const response = {
        userId,
        firstName,
        lastName,
        roles: rolesWithPermissions,
      };

      return response;
    },
  },
};
