
import data from '@/data/users.json';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { User } from '@/types/Login';

const users:User[]= data.users;

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const userEmail=req.query.userEmail
  const password=req.query.password
  const user = checkCredentials(userEmail as string, password as string)
  if (user) {
    res.status(200).send({user:user.userEmail,token:'xd'})

  }else{
    res.status(500).send({response:'usuario o clave incorrectas'})
  }
};


function checkCredentials(userEmail: string|undefined, password: string|undefined):User | null {
  const user = users.find((user:User) => user.userEmail === userEmail);

  if (!user) {
    return null;
  }
  if (user.password === password) {
    return user
  }

  return null ;
}