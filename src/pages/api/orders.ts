
import data from '@/data/orders.json';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Order } from '@/types/Orders';


const orders:Order[]= data.orders;

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const token=req.query.token
  if (token==='xd') {
    res.status(200).send({orders})
  }else{
    res.status(500).send({response:'el token no es valido'})
  }
};