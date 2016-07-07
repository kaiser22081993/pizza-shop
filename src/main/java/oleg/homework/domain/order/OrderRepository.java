package oleg.homework.domain.order;

import oleg.homework.domain.pizza.Pizza;
import oleg.homework.domain.DeliveryItem;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;


@ApplicationScoped
public class OrderRepository {

    private ConcurrentHashMap<String,Order> ordersDb;

    @PostConstruct
    public void init() {
        ordersDb = new ConcurrentHashMap<>();
        DeliveryItem p = new DeliveryItem();

    }

    public List<Order> getAll() {
        return new ArrayList<>(ordersDb.values());
    }

    public void createOrder(Order o) {
        ordersDb.put(o.getCustomer(),o);
    }


}
