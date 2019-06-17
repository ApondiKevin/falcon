import { GraphQLObjectType } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

export type RootFieldTypes = Record<string, string[]>;

export interface RootTypeFieldsFn {
  (typeDefs: string): RootFieldTypes;
  (typeDefs: Array<string>): RootFieldTypes;
}

export const getRootTypeFields: RootTypeFieldsFn = (typeDefs: string | Array<string>): RootFieldTypes => {
  const result: RootFieldTypes = {};
  if (!typeDefs) {
    return result;
  }
  const combinedTypeDefs: string = Array.isArray(typeDefs) ? typeDefs.join('\n') : typeDefs;

  try {
    const executableSchema = makeExecutableSchema({
      typeDefs: [
        combinedTypeDefs
          // Removing "extend type X" to avoid "X type missing" errors
          .replace(/extend\s+type/gm, 'type')
          // Removing directives
          .replace(/@(\w+)\(.*\)/gm, '')
          .replace(/@(\w+)/gm, '')
          // Removing type references from the base schema types
          .replace(/:\s*(\w+)/gm, ': Int')
          .replace(/\[\s*(\w+)\s*]/gm, '[Int]')
      ],
      resolverValidationOptions: {
        requireResolversForResolveType: false
      }
    });

    [executableSchema.getQueryType(), executableSchema.getMutationType()].forEach(
      (type: GraphQLObjectType | undefined | null) => {
        if (!type) {
          return;
        }
        const typeName: string = (type as GraphQLObjectType).name;
        Object.keys((type as GraphQLObjectType).getFields()).forEach((field: string) => {
          if (!(typeName in result)) {
            result[typeName] = [];
          }
          result[typeName].push(field as string);
        });
      }
    );
  } catch (error) {
    error.message = `Failed to get root type fields - ${error.message}`;
    throw error;
  }

  return result;
};