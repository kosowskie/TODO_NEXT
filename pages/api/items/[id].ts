
import { NextApiRequest, NextApiResponse } from 'next';
import { getItem, updateItem, deleteItem } from '../data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const itemId = parseInt(id as string, 10);

  if (isNaN(itemId)) {
    res.status(400).json({ error: 'Invalid ID' });
    return;
  }

  switch (req.method) {
    case 'GET':
      const item = getItem(itemId);
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
      break;
    case 'PUT':
      const { name, description } = req.body;
      if (!name || !description) {
        res.status(400).json({ error: 'Missing name or description' });
        return;
      }
      const updatedItem = updateItem(itemId, name, description);
      if (updatedItem) {
        res.status(200).json(updatedItem);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
      break;
    case 'DELETE':
      const success = deleteItem(itemId);
      if (success) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
