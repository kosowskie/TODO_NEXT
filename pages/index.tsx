import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

type Item = {
  id: number;
  name: string;
  description: string;
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ItemCard = styled.li`
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 5px;
  &:hover {
    background-color: #005bb5;
  }
`;

const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Home = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const createNewItem = async () => {
    if (name && description) {
      try {
        const response = await axios.post('/api/items', { name, description });
        setItems([...items, response.data]);
        setName('');
        setDescription('');
      } catch (error) {
        console.error('Error creating item:', error);
      }
    }
  };

  const updateItem = async (id: number) => {
    if (editName && editDescription) {
      try {
        const response = await axios.put(`/api/items/${id}`, { name: editName, description: editDescription });
        setItems(items.map(item => (item.id === id ? response.data : item)));
        setEditItemId(null);
        setEditName('');
        setEditDescription('');
      } catch (error) {
        console.error('Error updating item:', error);
      }
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await axios.delete(`/api/items/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <Container>
      <Title>TODO CRUD App</Title>
      <div>
        <Input
          type="text"
          placeholder="Nazwa"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Opis"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={createNewItem}>Stwórz zadanie</Button>
      </div>
      <ItemList>
        {items.map(item => (
          <ItemCard key={item.id}>
            {editItemId === item.id ? (
              <div>
                <Input
                  type="text"
                  placeholder="Nazwa"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Opis"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <Button onClick={() => updateItem(item.id)}>Save</Button>
                <Button onClick={() => {
                  setEditItemId(null);
                  setEditName('');
                  setEditDescription('');
                }}>Cancel</Button>
              </div>
            ) : (
              <div>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <Button onClick={() => {
                  setEditItemId(item.id);
                  setEditName(item.name);
                  setEditDescription(item.description);
                }}>Edytuj</Button>
                <Button onClick={() => deleteItem(item.id)}>Usuń</Button>
              </div>
            )}
          </ItemCard>
        ))}
      </ItemList>
    </Container>
  );
};

export default Home;
