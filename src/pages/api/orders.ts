import data from '@/data/orders.json';
import { Order } from '@/types/Orders';
import type { NextApiRequest, NextApiResponse } from 'next';

let orders: Order[] = data.orders;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query: { order_id }, query: { token } } = req;

  if (token !== 'xd') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  switch (method) {
    case 'GET':
      return res.status(200).json({ orders });

    case 'DELETE':
      const orderId = parseInt(order_id as string, 10);
      orders = orders.filter(order => order.id !== orderId);
      return res.status(200).json({ message: 'Orden eliminada exitosamente', orders });

    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).json({ error: `Método ${method} no permitido` });
  }
}
