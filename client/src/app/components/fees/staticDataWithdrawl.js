const withdrawlDataSource = [
  {
    key: '0',
    amountTraded: 'Less than 250',
    buying: '0.9%',
    selling: '0.49%'
  },
  {
    key: '1',
    amountTraded: 'More than 250',
    buying: '0.3%',
    selling: '0.19%'
  }
]

const withdrawlColumns = [
  {
    title: `Amount Traded (in Euros)*`,
    dataIndex: 'amountTraded',
    key: 'amountTraded'
  },
  {
    title: 'Buying Fee',
    dataIndex: 'buying',
    key: 'buying'
  },
  {
    title: 'Selling  Fee',
    dataIndex: 'selling',
    key: 'selling'
  }
]

export { withdrawlDataSource, withdrawlColumns }
