import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string
  value: number
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO ) : Transaction {
    if (!title || !value || !type) {
      throw Error('Transactions must have title, value and type.')
    }

    if (!/^income|outcome$/.test(type)) {
      throw Error('Transaction type must be \'income\' or \'outcome\'.')
    }

    if (value < 1) {
      throw Error('Transaction value must be greater than 0.')
    }

    if (typeof value !== 'number') {
      throw Error('Transaction value must have numeric format.')
    }

    if (typeof title !== 'string') {
      throw Error('Transaction title must be a string.')
    }

    const balance = this.transactionsRepository.getBalance()
    if (/^outcome$/.test(type) && value > balance.total) {
      throw Error('You don\'t have enough money.')
    }

    const transaction = this.transactionsRepository
      .create({ title, value, type })

    return transaction
  }
}

export default CreateTransactionService;
