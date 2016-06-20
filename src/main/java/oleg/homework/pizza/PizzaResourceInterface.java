package oleg.homework.pizza;


import oleg.homework.order.Order;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;


public interface PizzaResourceInterface {

    @GET
    public List<Pizza> getAllPizza();

    @GET
    @Path("{id}")
    public Pizza getOnePizza(@PathParam("id") int id);





    //...........
    //ADMIN ONLY
    @POST
    @MatrixParam("adimin")
    public Response addPizza(Pizza p);

    @DELETE
    @MatrixParam("admin")
    public void deleteOrder(int id);

    @PUT
    @MatrixParam("admin")
    public void updatePizza(Pizza p);

}
