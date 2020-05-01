import React, { useState, useEffect } from 'react';

import moment from 'moment';
import 'moment/locale/pt-br';

import sortBy from 'lodash.sortby';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';
import arrow from '../../assets/arrow.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);
  const [lastIncome, setLastIncome] = useState<Transaction | undefined>(
    {} as Transaction,
  );
  const [lastOutcome, setLastOutcome] = useState<Transaction | undefined>(
    {} as Transaction,
  );

  useEffect(() => {
    async function loadTransactions(): Promise<Transaction[]> {
      const response = await api.get('/transactions');
      const getTransactions = response.data.transactions;
      const getBalance = response.data.balance;
      setTransactions(sortBy(getTransactions, ['title']));
      setBalance(getBalance);
      return getTransactions;
    }
    loadTransactions();
  }, []);

  useEffect(() => {
    const outcomeFiltered = transactions.filter(
      item => item.type === 'outcome',
    );
    const outcomeDates = outcomeFiltered.map(item =>
      moment(item.created_at, 'DD/MM/YYYY'),
    );
    const lastOutcomeDate = moment.max(outcomeDates);
    const incomeFiltered = transactions.filter(item => item.type === 'income');
    const incomeDates = incomeFiltered.map(item =>
      moment(item.created_at, 'DD/MM/YYYY'),
    );
    const lastIncomeDate = moment.max(incomeDates);

    const lastIncomeFinal = incomeFiltered.find(item => {
      if (
        moment(lastIncomeDate).format() ===
        moment(item.created_at, 'DD/MM/YYYY').format()
      ) {
        return item;
      }
    });

    const lastOutcomeFinal = outcomeFiltered.find(item => {
      if (
        moment(lastOutcomeDate).format() ===
        moment(item.created_at, 'DD/MM/YYYY').format()
      ) {
        return item;
      }
    });

    setLastIncome(lastIncomeFinal);
    setLastOutcome(lastOutcomeFinal);
  }, [transactions]);

  function handleSortBy(target: string): void {
    setTransactions(sortBy(transactions, [target]));
  }

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">
              {formatValue(Number(balance.income))}
            </h1>
            <span>
              {`Última entrada ${moment(lastIncome?.created_at).fromNow()}`}
            </span>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {formatValue(Number(balance.outcome))}
            </h1>
            <span>
              {`Última saída ${moment(lastOutcome?.created_at).fromNow()}`}
            </span>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">
              {formatValue(Number(balance.total))}
            </h1>
            <span className="legend-balance">
              {`Última balanço ${moment
                .max([
                  moment(lastOutcome?.created_at),
                  moment(lastIncome?.created_at),
                ])
                .fromNow()}`}
            </span>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSortBy('title')}>
                  <span> Título </span>
                  <img src={arrow} alt="Arrow" />
                </th>
                <th onClick={() => handleSortBy('value')}>
                  <span>Preço</span>
                  <img src={arrow} alt="Arrow" />
                </th>
                <th onClick={() => handleSortBy('category')}>
                  <span>Categoria</span>
                  <img src={arrow} alt="Arrow" />
                </th>
                <th onClick={() => handleSortBy('created_at')}>
                  <span>Data</span>
                  <img src={arrow} alt="Arrow" />
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  <td className={`${transaction.type}`}>
                    {`${
                      transaction.type === 'outcome' ? '- ' : ''
                    }${formatValue(transaction.value)}`}
                  </td>
                  <td>{transaction.category.title}</td>
                  <td>{moment(transaction.created_at).format('DD/MM/YYYY')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
