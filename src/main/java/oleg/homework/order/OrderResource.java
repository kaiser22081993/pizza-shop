package oleg.homework.order;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.List;

@Singleton
@Path("/order")
@Consumes("application/json")
@Produces("application/json")
public class OrderResource {

    @Inject
    OrderRepository orders;

    //ADMIN ONLY
    @PermitAll
    @GET
    public List<Order> getAllOrders()
    {
        return orders.getAll();
    }


/*    @GET
    public List<Order> getUsersOrder(int userId)
    {
        return null;
    }*/

    @PermitAll
    @POST
    public void createOrder(Order o){
        orders.createOrder(o);
    }


    @DELETE
    public void cancelOrder(int id){

    }

    //ADMIN ONLY

    @PermitAll
    @PUT
    public void cancelOrder(Order o){

    }

}