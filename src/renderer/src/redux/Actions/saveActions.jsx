export const checkPageHash = (currentHash) => ({
    type: 'CHECK_PAGE_HASH',
    payload: currentHash,
  });

export const updateTableData = (newTableData) => ({
  type: 'UPDATE_TABLE_DATA',
  payload: newTableData,
});