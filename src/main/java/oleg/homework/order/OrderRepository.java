package oleg.homework.order;

import oleg.homework.pizza.Pizza;
import oleg.homework.pizza.PizzaItem;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;


@ApplicationScoped
public class OrderRepository {

    private ConcurrentHashMap<String,Order> ordersDb;

    @PostConstruct
    public void init() {
        ordersDb = new ConcurrentHashMap<>();
        PizzaItem p = new PizzaItem();
        List<Pizza> pizzas = new ArrayList<>();
        pizzas.add(Pizza.generateRandomPizza());
        p.setPizzas(pizzas);
        p.setQuantity(2);
        Order o = new Order("Oleh","03913123","Odessa ...",p,30,25,"21.05.2016");
        ordersDb.put(o.getCustomer(),o);
    }

    public List<Order> getAll() {
        return new ArrayList<>(ordersDb.values());
    }

    public void createOrder(Order o) {
        ordersDb.put(o.getCustomer(),o);
    }


}
