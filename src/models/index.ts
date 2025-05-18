import sequelize from '~/libs/db';
import User from './user';
import Product from './product';
import ProductVariant from './product-variant';
import BusinessPartner from './business-partner';
import PurchaseOrder from './purchase-order';
import PurchaseOrderItem from './purchase-order-item';
import GoodsReceipt from './goods-receipt';
import GoodsReceiptItem from './goods-receipt-item';
import PurchaseInvoice from './purchase-invoice';
import PurchaseInvoiceItem from './purchase-invoice-item';
import SalesOrder from './sales-order';
import SalesOrderItem from './sales-order-item';

export {
  sequelize,
  User,
  Product,
  ProductVariant,
  BusinessPartner,
  PurchaseOrder,
  PurchaseOrderItem,
  GoodsReceipt,
  GoodsReceiptItem,
  PurchaseInvoice,
  PurchaseInvoiceItem,
  SalesOrder,
  SalesOrderItem,
};