package oleg.homework.web_config;


import oleg.homework.domain.order.OrderRepository;
import oleg.homework.domain.pizza.PizzaRepository;
import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;

import javax.ws.rs.ApplicationPath;
@ApplicationPath("/rest")
public class MyApp extends ResourceConfig {
    public MyApp() {
        register(new AbstractBinder() {
            @Override
            protected void configure() {

                bind(PizzaRepository.class).to(PizzaRepository.class);
                bind(OrderRepository.class).to(OrderRepository.class);
            }
        });

    }
}
