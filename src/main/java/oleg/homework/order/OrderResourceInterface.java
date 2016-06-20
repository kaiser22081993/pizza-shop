package oleg.homework.order;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("order")
public interface OrderResourceInterface {

    @GET
    public List<Order> getAll(int userId);

    @POST
    public Response createOrder(Order o);

    @DELETE
    public void deleteOrder(int id);

    @PUT
    public void updateOrder(Order o);

}
