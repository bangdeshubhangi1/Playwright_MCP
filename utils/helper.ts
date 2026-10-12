export class Helper {
  static convertPriceToNumber(price: string): number {
    return Number(price.replace(/[^\d.]/g, ''));
  }

  static getProductDetails() {
    return {
      productName: 'Product 8',
      productQuantity: '1',
      productPrice: '$122.00',
      totalPrice: '$140.00',
    };
  }

  static getLoginDetails() {
    return {
      email: 'pavanol@xyz.com',
      password: 'test@123',
    };
  }
}
