import { useMemo, useState } from 'react';
import { useTransaction } from '@/hooks/useTransaction';
import { firestoreDateToJSDate } from '@/utils/firestoreDateToJSDate';
import { TransactionFilter } from '../TransactionFilter';
import { TransactionListItems } from '../TransactionListItems';

export const TransactionList = () => {
  const { transactions } = useTransaction();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minAmount, setMinAmount] = useState<string>('');
  const [maxAmount, setMaxAmount] = useState<string>('');
  const [transactionType, setTransactionType] = useState<'all' | 'income' | 'expense'>('all');

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (selectedCategory) {
      result = result.filter((transaction) => transaction.category === selectedCategory);
    }

    if (transactionType !== 'all') {
      result = result.filter((transaction) => transaction.type === transactionType);
    }

    if (minAmount) {
      const min = parseFloat(minAmount);
      result = result.filter((transaction) => Math.abs(transaction.amount) >= min);
    }

    if (maxAmount) {
      const max = parseFloat(maxAmount);
      result = result.filter((transaction) => Math.abs(transaction.amount) <= max);
    }

    return result;
  }, [transactions, selectedCategory, transactionType, minAmount, maxAmount]);

  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => {
      const dateA = firestoreDateToJSDate(a.date as unknown as Date).getTime();
      const dateB = firestoreDateToJSDate(b.date as unknown as Date).getTime();
      return dateB - dateA;
    });
  }, [filteredTransactions]);

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-gray-800 text-xl">Transações Financeiras</h2>
        <span className="text-gray-500 text-sm">
          {sortedTransactions.length} transação{sortedTransactions.length !== 1 ? 's' : ''}
        </span>
      </div>

      <TransactionFilter
        transactions={transactions}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        minAmount={minAmount}
        setMinAmount={setMinAmount}
        maxAmount={maxAmount}
        setMaxAmount={setMaxAmount}
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />

      <TransactionListItems transactions={sortedTransactions} />
    </div>
  );
};