import React, { createContext, useState, ReactNode } from 'react';

// Define types for orders and the context
type Order = {
  id: string;
  name: string;
  status: string; // Status can be 'Received', 'Picked', or 'Prepared'
};

type OrderContextType = {
  orders: Order[];
  menuItems: string[];
  addOrder: (name: string) => void;
  updateOrderStatus: (orderId: string, newStatus: string) => void;
};

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  // Initial state
  const [menuItems] = useState<string[]>(['Idly', 'Pizza', 'FriedRice']);
  const [orders, setOrders] = useState<Order[]>([
    { id: '1', name: 'Idly', status: 'Received' },
    { id: '2', name: 'Pizza', status: 'Received' },
    { id: '3', name: 'FriedRice', status: 'Picked' },
  ]);

  // Function to add a new order
  const addOrder = (name: string) => {
    const newOrder: Order = {
      id: Math.random().toString(), // Generate a random ID
      name,
      status: 'Received',
    };
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  // Function to update order status
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, menuItems, addOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};
