export type Item = {
    id: number;
    name: string;
    description: string;
  };
  
  let items: Item[] = [
    { id: 1, name: "Lorem ipsum 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 2, name: "Lorem ipsum 2", description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat" },
    { id: 3, name: "Lorem ipsum 3", description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur" },
    { id: 4, name: "Lorem ipsum 4", description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 5, name: "Przykładowe zadanie 1", description: "Przykładowy opis 1" },
    { id: 6, name: "Przykładowe zadanie 2", description: "Przykładowy opis 2" },
    { id: 7, name: "Przykładowe zadanie 3", description: "Przykładowy opis 3" },
  ];
  
  export function getItems(): Item[] {
    return items;
  }
  
  export function getItem(id: number): Item | undefined {
    return items.find(item => item.id === id);
  }
  
  export function createItem(name: string, description: string): Item {
    const newItem: Item = {
      id: items.length + 1,
      name,
      description,
    };
    items.push(newItem);
    return newItem;
  }
  
  export function updateItem(id: number, name: string, description: string): Item | undefined {
    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex > -1) {
      items[itemIndex] = { id, name, description };
      return items[itemIndex];
    }
    return undefined;
  }
  
  export function deleteItem(id: number): boolean {
    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex > -1) {
      items.splice(itemIndex, 1);
      return true;
    }
    return false;
  }