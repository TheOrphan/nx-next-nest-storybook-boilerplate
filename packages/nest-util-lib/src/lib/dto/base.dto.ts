export class BaseDto {
  id: number;
  page: number = 1;
  size: number = 10;
  orderBy: string = 'DESC';
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  constructor(page: number, size: number, orderBy: string) {
    this.page = page;
    this.size = size;
    this.orderBy = orderBy;
  }
}

export class FindOneDto {
  id: number;
}
