import { Query } from 'mongoose';

class queryBuilder<T> {
  public modelQuery: Query<T[], T>;
}
