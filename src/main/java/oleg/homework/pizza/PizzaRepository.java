package oleg.homework.pizza;


import javax.annotation.PostConstruct;

import javax.enterprise.context.ApplicationScoped;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.logging.Logger;

@ApplicationScoped
public class PizzaRepository {

    private Map<Integer,Pizza> db;
    private AtomicLong counter;

    Logger LOG = Logger.getLogger(PizzaRepository.class.getSimpleName());

    @PostConstruct
    public void init(){
        LOG.info("Pizza Repository: -- " + this.toString());
        db = new ConcurrentHashMap<>();
        counter = new AtomicLong();

        for(int i = 0; i < 50; i++) {
            Pizza p = Pizza.generateRandomPizza();
            db.put(p.getId(),p);
        }
    }

    public List<Pizza> getAll(){
        return new ArrayList<>(db.values());
    }

    public Optional<Pizza> getOne(int id) {

        return Optional.ofNullable(db.get(id));
    }













}
