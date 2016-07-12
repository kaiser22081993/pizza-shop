package oleg.homework.domain.order;

import oleg.homework.domain.DeliveryItem;

import java.util.List;


public class Order {


    private String customer;
    private String date = "00.00.00";
    private boolean canceled;
    private String address;
    private String phone;

    private List<DeliveryItem> item;

    public Order(){
    }

    public void updateFrom(Order o){
        o.setAddress(o.getAddress());
        o.setCustomer(o.getCustomer());
        o.setDate(o.getDate());
        o.setPhone(o.getPhone());
    }

    public boolean isCanceled() {
        return canceled;
    }

    public void setCanceled(boolean canceled) {
        this.canceled = canceled;
    }

    public List<DeliveryItem> getItem() {
        return item;
    }

    public void setItem(List<DeliveryItem> item) {
        this.item = item;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }



    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
