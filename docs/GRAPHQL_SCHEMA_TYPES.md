# Graphql Schema and Types

1. Scalar Types:

    - `Date`: This is a scalar type representing a date. The actual structure will depend on how your GraphQL server defines this custom scalar.

    - `BigInt`: This scalar type represents a large integer. The exact size will depend on your GraphQL server's implementation.

    - `JSON`: This scalar type represents a JSON object. This will let you query arbitrary JSON data in your GraphQL queries.

2. Input Types:

    - `SortInput`: This input type is used to specify sorting order for a query.

        ```graphql
        input SortInput {
          order: [[String]]
        }
        ```

    - `PaginationInput`: This input type is used to specify pagination parameters for a query.

        ```graphql
        input PaginationInput {
          page: Int,
          pageSize: Int!
        }
        ```

    - `StringFilterConstraint`, `IntFilterConstraint`, `BigIntFilterConstraint`, `FloatFilterConstraint`, `DateFilterConstraint`, `BooleanFilterConstraint`, `SalesforceAttributes`, `SalesforceEntity`, `CurrentReleaseFilterConstraint`, `VehicleTypeCodeFilterConstraint`, `StockTypeFilterConstraint`, `DealerTypeFilterConstraint`: These input types are used to specify filters for a query. Each field in these input types specifies a different type of constraint for the filter.

3. Enums:

    - `SampleEnum`: These enums represent various predefined values that a field can take. The exact meaning of each value will depend on the context in which it is used.

4. General Types:

    - `PageInfo`: This type represents pagination information for a query.

      ```graphql
        type PageInfo {
          currentPage: Int,
          perPage: Int,
          itemCount: Int,
          pageItemCount: Int,
          pageCount: Int,
          hasPreviousPage: Boolean,
          hasNextPage: Boolean
        }
      ```

    - `RangeResponse`, `FieldSlugPair`, `CountByResponse`, `GroupByResponse`, `FieldAndSlugWithCount`: These types represent different types of responses that can be returned from a query. Each type includes various fields that represent different parts of the response.

<!-- Add entity types below -->