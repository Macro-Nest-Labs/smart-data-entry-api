export default {
  operationName: 'GET_RECEIPTS',
  query: `query GET_RECEIPTS($paginate: PaginationInput, $where: WhereOptionsReceipt) {
    receipts: Receipts(paginate: $paginate, where: $where) {
      pageInfo {
        currentPage
        perPage
        itemCount
        pageItemCount
        pageCount
        hasPreviousPage
        hasNextPage
      }
      results {
        id
        uuid
        receiptNumber
        financialYear
        date
        mobileNumber
        name
        address
        amount
        aadharNumber
        panNumber
      }
    }
  }
  `,
  variables: {
    where: {
      amount: {
        gt: 3000,
      },
    },
    paginate: {
      pageSize: 50,
      page: 0,
    },
  },
};
