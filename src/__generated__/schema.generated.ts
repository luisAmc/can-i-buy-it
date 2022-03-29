export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
};

export type Budget = {
  __typename?: 'Budget';
  category: Scalars['String'];
  id: Scalars['ID'];
  limit: Scalars['Float'];
};

export type CreateTransactionInput = {
  amount: Scalars['Float'];
  category: Scalars['String'];
  date: Scalars['DateTime'];
  notes: Scalars['String'];
  type: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTransaction: Transaction;
  login: User;
  signUp: User;
};


export type MutationCreateTransactionArgs = {
  input: CreateTransactionInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
};

export type SignUpInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Float'];
  category: Scalars['String'];
  date: Scalars['DateTime'];
  id: Scalars['ID'];
  notes?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  budgets: Array<Budget>;
  id: Scalars['ID'];
  transactions: Array<Transaction>;
  transactionsCount: Scalars['Int'];
  username: Scalars['String'];
};


export type UserTransactionsArgs = {
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
};
