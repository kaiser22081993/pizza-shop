package oleg.homework.domain.order;

import oleg.homework.domain.pizza.Pizza;
import oleg.homework.domain.DeliveryItem;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;


@ApplicationScoped
public class OrderRepository {

    private ConcurrentHashMap<Long,Order> ordersDb;
    private AtomicLong idCounter;
    @PostConstruct
    public void init() {
        ordersDb = new ConcurrentHashMap<>();
        idCounter = new AtomicLong(0);
        DeliveryItem p = new DeliveryItem();

    }

    public List<Order> getAll() {
        return new ArrayList<>(ordersDb.values());
    }

    public void createOrder(Order o) {
        o.setId(idCounter.incrementAndGet());
        ordersDb.put(o.getId(),o);
    }


}
