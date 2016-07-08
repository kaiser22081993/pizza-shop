package oleg.homework.domain.order;

import oleg.homework.domain.DeliveryItem;

import java.util.List;


public class Order {

    private int id;
    private String customer;
    private String date;
    private int estimatedDeliveryTime;
    private int deliveryTime;
    private boolean canceled;
    private String address;
    private String phone;

    private List<DeliveryItem> item;

    public Order(){

    }
    public Order(String customer, String phone, String address, int deliveryTime, int estimatedDeliveryTime, String date) {
        this.customer = customer;
        this.phone = phone;
        this.address = address;
        this.deliveryTime = deliveryTime;
        this.estimatedDeliveryTime = estimatedDeliveryTime;
        this.date = date;
        canceled = false;
    }

    public void updateFrom(Order o){
        o.setAddress(o.getAddress());
        o.setCustomer(o.getCustomer());
        o.setDate(o.getDate());
        o.setDeliveryTime(o.getDeliveryTime());
        o.setEstimatedDeliveryTime(o.getEstimatedDeliveryTime());
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
