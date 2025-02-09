export class Product {
  constructor(
    public id: string,
    public tier: number,
    public categoriesId: string,
    public price: number,
    public name: LocalizedText,
    public detail: LocalizedText
  ) {}
}

export class LocalizedText {
  constructor(public tr: string, public en: string) {}
}

export class Category {
  constructor(
    public id: string,
    public parentCatId: string | null,
    public name: LocalizedText
  ) {}
}

export class ProductTierDTO {
  constructor(public id: string, public tier: number) {}
}
 
export class User {
  constructor(
    public accessToken: string,
    public id: string,
    public username: string ,
    public email: string ,
    public roles: string [],
    public tokenType: string ,
  ) {}
}
