/**
 * Parses the given query object to be used in Mongo query API.
 * @param {object} queryObj The query object to parse
 * @returns {object} Parsed object valid for Mongo query API.
 */
export const parseMongoQuery: (queryObj: { [key: string]: string }) => {
  [key: string]: string;
} = (queryObj) => {
  // convert id to _id
  if (queryObj['id']) {
    queryObj['_id'] = queryObj['id'];
    delete queryObj['id'];
  }

  return queryObj;
};

type PrimitiveQueryValue = string | number | Date | boolean;
type QueryValue = PrimitiveQueryValue | PrimitiveQueryValue[] | MongoQuery;

interface MongoQueryOperators<T> {
  $eq?: T;
  $ne?: T;
  $gt?: T;
  $gte?: T;
  $lt?: T;
  $lte?: T;
  $in?: T[];
  $nin?: T[];
}

interface MongoQuery {
  $and?: MongoQuery[];
  $or?: MongoQuery[];
  [key: string]: MongoQueryField<QueryValue> | MongoQuery[] | undefined;
}

type MongoQueryField<T> = MongoQueryOperators<T> | T;

export function parseWhereArgsToMongoQuery(whereArgs) {
  const query: MongoQuery = {};

  // Recursively handle 'and' conditions
  if (whereArgs.and) {
    query.$and = whereArgs.and.map(parseWhereArgsToMongoQuery);
  }

  // Recursively handle 'or' conditions
  if (whereArgs.or) {
    query.$or = whereArgs.or.map(parseWhereArgsToMongoQuery);
  }

  // Iterate over all keys in the whereArgs object
  Object.keys(whereArgs).forEach((key) => {
    // Convert 'id' to MongoDB's '_id'
    if (key === 'id') {
      query['_id'] = whereArgs['id'];
    } else if (key !== 'and' && key !== 'or') {
      // For other fields, check if the value is a constraint object or a direct value
      const value = whereArgs[key];
      if (typeof value === 'object' && !Array.isArray(value)) {
        // Handle constraint objects by converting them to MongoDB query operators
        const constraint: MongoQueryOperators<QueryValue> = {};
        Object.entries(value).forEach(([constraintKey, constraintValue]) => {
          // Here you can add more sophisticated mapping between GraphQL and MongoDB operators if needed
          const mongoOperator = `$${constraintKey}`;
          constraint[mongoOperator] = constraintValue;
        });
        query[key] = constraint;
      } else {
        // Direct assignment for simple key-value pairs
        query[key] = value;
      }
    }
  });

  return query;
}
