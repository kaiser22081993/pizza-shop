package oleg.homework.domain;
import oleg.homework.domain.order.Order;
import oleg.homework.domain.pizza.Pizza;

import java.util.List;

public class DeliveryItem {

    private int id;
    private Order order;
    private int quantity;


    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
