import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../service/OrderService";
import type { Order } from "../../types/Order";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const response = await getOrderById(id!);
      setOrder(response.order);
    } catch (error) {
      console.log(error);
    }
  };

  if (!order) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Order Details</h1>

      <p>Order ID: {order._id}</p>
    </div>
  );
};

export default OrderDetails;
