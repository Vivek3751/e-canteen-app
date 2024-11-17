import React, { createContext, useState, ReactNode } from 'react';

export interface Order {
  items: string[];
  status: 'Received' | 'Prepared' | 'Picked';
}

export interface OrderContextProps {
  menuItems: string[];
  orders: Order[];
  addMenuItem: (item: string) => void;
  editMenuItem: (index: number, newItem: string) => void;
  deleteMenuItem: (index: number) => void;
  placeOrder: (items: string[]) => void;
  updateOrderStatus: (index: number) => void;
}

export const OrderContext = createContext<OrderContextProps | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<string[]>(['Pizza', 'Burger', 'Pasta']);
  const [orders, setOrders] = useState<Order[]>([]);

  const addMenuItem = (item: string) => {
    setMenuItems((prev) => [...prev, item]);
  };

  const editMenuItem = (index: number, newItem: string) => {
    setMenuItems((prev) => {
      const updated = [...prev];
      updated[index] = newItem;
      return updated;
    });
  };

  const deleteMenuItem = (index: number) => {
    setMenuItems((prev) => prev.filter((_, i) => i !== index));
  };

  const placeOrder = (items: string[]) => {
    const newOrder: Order = { items, status: 'Received' };
    setOrders((prev) => [...prev, newOrder]);
  };

  const updateOrderStatus = (index: number) => {
    setOrders((prev) =>
      prev.map((order, i) => {
        if (i === index) {
          const nextStatus =
            order.status === 'Received'
              ? 'Prepared'
              : order.status === 'Prepared'
              ? 'Picked'
              : 'Received';
          return { ...order, status: nextStatus };
        }
        return order;
      })
    );
  };

  return (
    <OrderContext.Provider
      value={{
        menuItems,
        orders,
        addMenuItem,
        editMenuItem,
        deleteMenuItem,
        placeOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
