package oleg.homework.domain.pizza;


import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
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

    @PermitAll
    @GET
    public Response getAllPizza(@DefaultValue("0")@QueryParam("start")int start
            , @DefaultValue("9")@QueryParam("end")int end,@Context  HttpHeaders headers) {

        List<Pizza> pizzas = repository.getAll(start, end);
        //Links for the next and previous pages.
        int length = end - start;
        int nextStart = end;
        int nextEnd = nextStart + length;
        int prevStrat = (start > length)? start - length : 0;
        int prevEnd = prevStrat + length;

        //Write to Response
        return Response
                .ok(pizzas)
                .link(UriBuilder
                        .fromPath("rest/pizza")
                        .queryParam("start", String.valueOf(nextStart))
                        .queryParam("end", String.valueOf(nextEnd)).build(), "next")
                .link(UriBuilder
                        .fromPath("rest/pizza")
                        .queryParam("start", String.valueOf(prevStrat))
                        .queryParam("end", String.valueOf(prevEnd)).build(), "previous")
                .build();
    }

    @PermitAll
    @GET
    @Path("{id}")
    public Response getOnePizza(@PathParam("id")int id ) {

        LOG.info("GET ONE!!!!!!!!!!");
        Pizza p = repository.getOne(id)
                .orElseThrow(() -> new NotFoundException("pizza not found!"));

        //Add link header with next and previous pizza
        return Response
                .ok(p)
                .link(UriBuilder
                        .fromResource(PizzaResource.class)
                        .path(String.valueOf(repository.getNext(id))).build(), "next")
                .link(UriBuilder
                        .fromResource(PizzaResource.class)
                        .path(String.valueOf(repository.getPrevious(id))).build(), "previous")
                .build();
    }


    @POST
    public Response addPizza(Pizza p,@Context  HttpHeaders headers) {


        repository.createPizza(p);
        return Response
                .created(UriBuilder
                        .fromResource(PizzaResource.class)
                        .path("" + p.getId())
                        .build())
                .build();
    }

    @DELETE
    public void deletePizza(int id) {
        repository.delete(id);
    }

    @PUT
    public void updatePizza(Pizza p) {
        repository.updatePizza(p);
    }
}
