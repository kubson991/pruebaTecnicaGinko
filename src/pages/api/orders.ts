
import data from '@/data/orders.json';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Order {
    id: number;
    date: string;
    name: string;
    shipTo: string;
    paymentMethod: string;
    saleAmount: string;
  }

const orders:Order[]= data.orders;

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const username=req.query.username
  const password=req.query.password
  const user = checkCredentials(username as string, password as string)
  if (user) {
    res.status(200).send({user:user.username,token:'xd'})

  }else{
    res.status(500).send({response:'usuario o clave incorrectas'})
  }
};


function checkCredentials(username: string|undefined, password: string|undefined):User | null {
  // Buscar el usuario por el nombre de usuario
  const user = users.find((user:User) => user.username === username);

  // Si no se encuentra el usuario, devolver falso
  if (!user) {
    return null;
  }
  if (user.password === password) {
    return user
  }

  // Verificar la contraseña
  return null ;
}