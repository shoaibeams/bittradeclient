const depositDataSource = [
  {
    key: '0',
    depositAmount: '10 - 25',
    fee: '£1.99'
  },
  {
    key: '1',
    depositAmount: '25 - 100',
    fee: '£4.99'
  },
  {
    key: '2',
    depositAmount: '> 100',
    fee: '£10 or 0.2% (whichever is higher)'
  }
]

const depositColumns = [
  {
    title: 'Deposit Amount (in Euros)*',
    dataIndex: 'depositAmount',
    key: 'depositAmount'
  },
  {
    title: 'Fee',
    dataIndex: 'fee',
    key: 'fee'
  }
]

export { depositDataSource, depositColumns }
