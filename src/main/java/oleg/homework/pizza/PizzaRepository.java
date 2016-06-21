package oleg.homework.pizza;


import javax.annotation.PostConstruct;

import javax.enterprise.context.ApplicationScoped;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@ApplicationScoped
public class PizzaRepository {

    private Map<Integer, Pizza> db;

    Logger LOG = Logger.getLogger(PizzaRepository.class.getSimpleName());

    @PostConstruct
    public void init() {
        LOG.info("Pizza Repository: -- " + this.toString());
        db = new LinkedHashMap<>();


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
                if(i < keyList.size())
                pizzas.add(db.get(keyList.get(i)));

        }
        return pizzas;
    }

    public Optional<Pizza> getOne(int id) {

        return Optional.ofNullable(db.get(id));
    }

    public int getNext(int id) {
        List<Integer> keyList = db.keySet().stream().collect(Collectors.toList());
        for (int i = 0; i < keyList.size(); i++) {
            if (keyList.get(i) == id && i < keyList.size() - 1) {
                return keyList.get(i + 1);
            }
        }
        return keyList.get(0);
    }

    public int getPrevious(int id) {
        List<Integer> keyList = db.keySet().stream().collect(Collectors.toList());
        for (int i = 0; i < keyList.size(); i++) {
            if (keyList.get(i) == id && i > 0) {
                return keyList.get(i - 1);
            }
        }
        return keyList.get(keyList.size() - 1);
    }


}
