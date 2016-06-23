package oleg.homework.order;


import oleg.homework.Courier;
import oleg.homework.pizza.PizzaItem;


public class Order {

    private String customer;
    private String date;
    private int estimatedDeliveryTime;
    private int deliveryTime;
    private Courier courier;
    private PizzaItem item;
    private String address;
    private String phone;

    public Order(){

    }
    public Order(String customer, String phone, String address, PizzaItem item, int deliveryTime, int estimatedDeliveryTime, String date) {
        this.customer = customer;
        this.phone = phone;
        this.address = address;
        this.item = item;

        this.deliveryTime = deliveryTime;
        this.estimatedDeliveryTime = estimatedDeliveryTime;
        this.date = date;
    }

    public void updateFrom(Order o){
        o.setAddress(o.getAddress());
        o.setCustomer(o.getCustomer());
        o.setCourier(o.getCourier());
        o.setDate(o.getDate());
        o.setItem(o.getItem());
        o.setDeliveryTime(o.getDeliveryTime());
        o.setEstimatedDeliveryTime(o.getEstimatedDeliveryTime());
        o.setPhone(o.getPhone());
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

    public int getEstimatedDeliveryTime() {
        return estimatedDeliveryTime;
    }

    public void setEstimatedDeliveryTime(int estimatedDeliveryTime) {
        this.estimatedDeliveryTime = estimatedDeliveryTime;
    }

    public int getDeliveryTime() {
        return deliveryTime;
    }

    public void setDeliveryTime(int deliveryTime) {
        this.deliveryTime = deliveryTime;
    }

    public Courier getCourier() {
        return courier;
    }

    public void setCourier(Courier courier) {
        this.courier = courier;
    }

    public PizzaItem getItem() {
        return item;
    }

    public void setItem(PizzaItem item) {
        this.item = item;
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
