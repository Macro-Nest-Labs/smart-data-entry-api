export const generateSortInputType = (typeName: string, fieldNames: string[]) => `
    enum ${typeName}Field { 
      ${fieldNames.join('\n')}
    }

    type Sort${typeName} { 
      column: ${typeName}Field
      order: SortOrder
    }

    input Sort${typeName}Input { 
      order: [Sort${typeName}]
    }
  `;

export const resolvers = {};
