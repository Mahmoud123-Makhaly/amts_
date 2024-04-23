import product from '@assets/images/cart/product.png';

export const orderReturnData = [
  {
    odrerNumber: '#Order Number',
    date: 'يوم 12يناير 2023',
    returning: true,
    deliveryAddress: 'عنوان تسليم الشحنة',
    CustomerName: 'الاسم',
    customerAddress: 'العنوان',
    phoneNumber: 'رقم التليفون',
    products: [
      {
        imgSrc: product.src,
        productTitle: 'كيزر ميني',
        productPrice: '11 ج.م',
        productDesc: 'عيش فينو',
      },
      {
        imgSrc: product.src,
        productTitle: 'كيزر ميني',
        productPrice: '11 ج.م',
        productDesc: 'عيش فينو',
      },
      {
        imgSrc: product.src,
        productTitle: 'كيزر ميني',
        productPrice: '11 ج.م',
        productDesc: 'عيش فينو',
      },
    ],
    returnDone: false,
    valid: true,
  },
  {
    odrerNumber: '#Order Number',
    date: 'يوم 12يناير 2023',
    returning: false,
    deliveryAddress: 'عنوان تسليم الشحنة',
    CustomerName: 'الاسم',
    customerAddress: 'العنوان',
    phoneNumber: 'رقم التليفون',
    products: [
      {
        imgSrc: product.src,
        productTitle: 'كيزر ميني',
        productPrice: '11 ج.م',
        productDesc: 'عيش فينو',
      },
      {
        imgSrc: product.src,
        productTitle: 'كيزر ميني',
        productPrice: '11 ج.م',
        productDesc: 'عيش فينو',
      },
      {
        imgSrc: product.src,
        productTitle: 'كيزر ميني',
        productPrice: '11 ج.م',
        productDesc: 'عيش فينو',
      },
    ],
    returnDone: true,
    valid: true,
  },
  {
    odrerNumber: '#Order Number',
    date: 'يوم 12يناير 2023',
    returning: false,
    deliveryAddress: 'عنوان تسليم الشحنة',
    CustomerName: 'الاسم',
    customerAddress: 'العنوان',
    phoneNumber: 'رقم التليفون',
    products: [
      {
        imgSrc: product.src,
        productTitle: 'كيزر ميني',
        productPrice: '11 ج.م',
        productDesc: 'عيش فينو',
      },
      {
        imgSrc: product.src,
        productTitle: 'كيزر ميني',
        productPrice: '11 ج.م',
        productDesc: 'عيش فينو',
      },
      {
        imgSrc: product.src,
        productTitle: 'كيزر ميني',
        productPrice: '11 ج.م',
        productDesc: 'عيش فينو',
      },
    ],
    returnDone: true,

    valid: false,
  },
];
