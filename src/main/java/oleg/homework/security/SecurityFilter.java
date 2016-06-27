package oleg.homework.security;


import org.glassfish.jersey.internal.util.Base64;

import javax.annotation.security.PermitAll;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Logger;

@Provider
public class SecurityFilter implements ContainerRequestFilter {

    Logger LOG = Logger.getLogger(SecurityFilter.class.getName());

    @Context
    ResourceInfo resourceInfo;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        Map<String,String> users = new ConcurrentHashMap<>();
        users.put("Oleh", "123456");
        requestContext.setSecurityContext(new SecurityContext() {
            @Override
            public Principal getUserPrincipal() {
                return null;
            }

            @Override
            public boolean isUserInRole(String role) {
                return false;
            }

            @Override
            public boolean isSecure() {
                LOG.info("Is secure: " + !resourceInfo.getResourceMethod().isAnnotationPresent(PermitAll.class));
                return !resourceInfo.getResourceMethod().isAnnotationPresent(PermitAll.class);

            }

            @Override
            public String getAuthenticationScheme() {
                return BASIC_AUTH;
            }
        });
        if(requestContext.getSecurityContext().isSecure()){
            //Checking user name and password
            List<String> credentials=  requestContext.getHeaders().get(HttpHeaders.AUTHORIZATION);
            String userAndPwd = Base64.decodeAsString(credentials.get(0).split(" ")[1]);
            String userName = userAndPwd.split(":")[0];
            String password = userAndPwd.split(":")[1];
            if(users.get(userName) == null){
                throw new WebApplicationException(Response.Status.UNAUTHORIZED);
            }
            if(!users.get(userName).equals(password)) {
                throw new WebApplicationException(Response.Status.UNAUTHORIZED);
            }
        }

    }
}