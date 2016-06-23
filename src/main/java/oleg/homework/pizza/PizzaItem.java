package oleg.homework.pizza;
import java.util.List;

public class PizzaItem {
    private List<Pizza> pizzas;
    private int quantity;

    public List getPizzas() {
        return pizzas;
    }

    public void setPizzas(List pizzas) {
        this.pizzas = pizzas;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
