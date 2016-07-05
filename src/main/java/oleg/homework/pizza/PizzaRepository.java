package oleg.homework.pizza;


import javax.annotation.PostConstruct;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@ApplicationScoped
public class PizzaRepository {

    //permanent Database
    private EntityManager em;

    //test db
    private Map<Integer, Pizza> db;

    Logger LOG = Logger.getLogger(PizzaRepository.class.getSimpleName());

    @PostConstruct
    public void init() {
        LOG.info("Pizza Repository: -- " + this.toString());
//        em = Persistence.createEntityManagerFactory("PizzaShop").createEntityManager();
        db = new ConcurrentHashMap<>();

        for (int i = 0; i < 50; i++) {
            Pizza p = Pizza.generateRandomPizza();
            db.put(p.getId(), p);
        }

    }

    public List<Pizza> getAll(int start, int end) {
        List<Integer> keyList = db.keySet().stream().collect(Collectors.toList());
        List<Pizza> pizzas = new ArrayList<>();
        LOG.info("get all:");
        for (int i = start; i < end; i++) {
            if (i < keyList.size())
                pizzas.add(db.get(keyList.get(i)));

        }
        return pizzas;
    }

    public Optional<Pizza> getOne(int id) {

        return Optional.ofNullable(db.get(id));
    }

    public void createPizza(Pizza p) {
        Objects.nonNull(p);
        db.put(p.getId(), p);
    }

    //return next id from map
    public int getNext(int id) {
        List<Integer> keyList = db.keySet().stream().collect(Collectors.toList());
        for (int i = 0; i < keyList.size(); i++) {
            if (keyList.get(i) == id && i < keyList.size() - 1) {
                return keyList.get(i + 1);
            }
        }
        return keyList.get(0);
    }

    //return previous id from map
    public int getPrevious(int id) {
        List<Integer> keyList = db.keySet().stream().collect(Collectors.toList());
        for (int i = 0; i < keyList.size(); i++) {
            if (keyList.get(i) == id && i > 0) {
                return keyList.get(i - 1);
            }
        }
        return keyList.get(keyList.size() - 1);
    }

    public void delete(int id){
        db.remove(id);
    }

    public void updatePizza(Pizza p){
        Pizza pizzaFromDb = db.get(p.getId());
        Objects.nonNull(pizzaFromDb);
        pizzaFromDb = p;
    }


}
