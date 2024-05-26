import { NextApiRequest, NextApiResponse } from 'next';
import { getItems, createItem, updateItem, deleteItem } from './data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(getItems());
      break;
    case 'POST':
      const { name, description } = req.body;
      if (!name || !description) {
        res.status(400).json({ error: 'Missing name or description' });
        return;
      }
      const newItem = createItem(name, description);
      res.status(201).json(newItem);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}