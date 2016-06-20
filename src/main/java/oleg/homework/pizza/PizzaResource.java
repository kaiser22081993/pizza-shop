package oleg.homework.pizza;


import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.logging.Logger;


@Path("/pizza")
@Singleton
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PizzaResource implements PizzaResourceInterface {

    private Logger LOG = Logger.getLogger(PizzaResource.class.getSimpleName());

    @Inject
    PizzaRepository repository;

    @Override
    public List<Pizza> getAllPizza() {
        return repository.getAll();
    }


    @Override
    public Pizza getOnePizza(int id) {
        LOG.info("GET ONE!!!!!!!!!!");
        return repository.getOne(id).orElseThrow(() -> new NotFoundException("pizza not found!"));
    }

    @Override
    public Response addPizza(Pizza p) {
        return null;
    }

    @Override
    public void deleteOrder(int id) {

    }

    @Override
    public void updatePizza(Pizza p) {

    }
}
