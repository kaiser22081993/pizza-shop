package oleg.homework.pizza;


import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import java.util.List;
import java.util.logging.Logger;


@Path("/pizza")
@Singleton
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PizzaResource {

    private Logger LOG = Logger.getLogger(PizzaResource.class.getSimpleName());

    @Inject
    PizzaRepository repository;

    @GET
    public Response getAllPizza(@DefaultValue("0")@QueryParam("start")int start, @DefaultValue("9")@QueryParam("end")int end) {
        List<Pizza> pizzas = repository.getAll(start, end);
        int nextStart = end;
        int nextEnd = nextStart + 9;

        return Response.ok(pizzas)
                .link(UriBuilder.fromResource(PizzaResource.class)
                        .queryParam("start",String.valueOf(nextStart))
                        .queryParam("end",String.valueOf(nextEnd)).build(),"next")
                .build();
    }

    @GET
    @Path("{id}")
    public Response getOnePizza(@PathParam("id")int id) {
        LOG.info("GET ONE!!!!!!!!!!");
        Pizza p = repository.getOne(id)
                .orElseThrow(() -> new NotFoundException("pizza not found!"));
        return Response.ok(p)
                .link(UriBuilder
                        .fromResource(PizzaResource.class)
                        .path(String.valueOf(repository.getNext(id))).build(), "next")
                .link(UriBuilder
                        .fromResource(PizzaResource.class)
                        .path(String.valueOf(repository.getPrevious(id))).build(), "previous")
                .build();
    }


    @POST
    @MatrixParam("adimin")
    public Response addPizza(Pizza p) {
        return null;
    }

    @DELETE
    @MatrixParam("admin")
    public void deletePizza(int id) {

    }

    @PUT
    @MatrixParam("admin")
    public void updatePizza(Pizza p) {

    }
}
