import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionRepositoryDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce((acc: Balance, curr: Transaction) => {
      acc[curr.type] += curr.value
      return acc
    }, { income: 0, outcome: 0, total: 0 })

    const total = balance.income - balance.outcome

    return { ...balance, total }
  }

  public create({ title, value, type }: TransactionRepositoryDTO) : Transaction {
    const transaction = new Transaction({ title, value, type })
    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository;
