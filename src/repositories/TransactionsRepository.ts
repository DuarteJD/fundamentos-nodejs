import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    this.transactions.forEach(t => {
      if (t.type === 'income') {
        balance.income += t.value;
        balance.total += t.value;
      }
      if (t.type === 'outcome') {
        balance.outcome += t.value;
        balance.total -= t.value;
      }
    });

    return balance;
  }

  public create(
    title: string,
    value: number,
    type: 'income' | 'outcome',
  ): Transaction {
    const transaction = new Transaction({ title, type, value });

    const saldos: Balance = this.getBalance();

    if (type === 'outcome' && value > saldos.total) {
      throw Error('You dont have this money, guapo!');
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
