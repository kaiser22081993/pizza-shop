package oleg.homework.domain;
import oleg.homework.domain.order.Order;
import oleg.homework.domain.pizza.Pizza;

import java.util.List;

public class DeliveryItem {

    private int id;
    private Pizza pizza;
    private int quantity;


    public Pizza getPizza() {
        return pizza;
    }

    public void setPizza(Pizza pizza) {
        this.pizza = pizza;
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
