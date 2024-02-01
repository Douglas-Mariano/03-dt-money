import { useState, useEffect, createContext, ReactNode } from 'react';
import { api } from '../lib/axios';

interface Transaction {
    id: number;
    description: string;
    type: "income" | "outcome";
    price: number;
    category: string;
    createdAt: string;
  }
  
  interface TransactionContextType {
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
  }

  interface TransactionsProviderProps {
    readonly children: ReactNode;
  }

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        q: query,
      }
    })
    setTransactions(response.data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

    return (
        <TransactionsContext.Provider 
        value={{ 
          transactions,
          fetchTransactions,
          }}>
            {children}
        </TransactionsContext.Provider>
    )
}