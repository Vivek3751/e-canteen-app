import React, { createContext, useState, ReactNode } from "react";

// Define types for orders and menu
interface OrderContextType {
  orders: string[];
  addOrder: (order: string) => void;
  menuItems: string[];
  addMenuItem: (item: string) => void;
}

interface OrderProviderProps {
  children: ReactNode;
}

// Creating the context with an initial empty state
const OrderContext = createContext<OrderContextType | undefined>(undefined);


const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<string[]>([]);
  const [menuItems, setMenuItems] = useState<string[]>(["Pizza", "Burger", "Pasta"]);

  const addOrder = (order: string) => {
    setOrders([...orders, order]);
  };

  const addMenuItem = (item: string) => {
    setMenuItems([...menuItems, item]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, menuItems, addMenuItem }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
