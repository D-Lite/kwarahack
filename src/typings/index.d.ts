type AccountType = 'patient' | 'workforce';
interface UserInfo {
  id: string;
  email: string;
  accountType: AccountType;
}

interface PagingOptions {
  page?: number;
  perPage?: number;
}

interface SortingOptions {
  sortBy?: string;
  order?: 'asc' | 'desc';
}

interface PaginatedResult<T = any> {
  page: number;
  perPage: number;
  hasNextPage: boolean;
  data: T[];
}