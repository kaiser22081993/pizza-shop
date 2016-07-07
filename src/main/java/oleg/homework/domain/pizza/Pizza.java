package oleg.homework.domain.pizza;

import javax.persistence.*;

@Entity
@Table(name = "pizza")
public class Pizza {

    @Id
    private int id;
    private String title;
    private float  price;
    private String preview;
    private String previewLarge;
    private String description;
    private int quantity = 1;


    public Pizza() {

    }

    public Pizza(int id, String description, String previewLarge, String preview, float price, String title) {
        this.id = id;
        this.description = description;
        this.previewLarge = previewLarge;
        this.preview = preview;
        this.price = price;
        this.title = title;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPreviewLarge() {
        return previewLarge;
    }

    public void setPreviewLarge(String getPreviewLarge) {
        this.previewLarge = getPreviewLarge;
    }

    public String getPreview() {
        return preview;
    }

    public void setPreview(String preview) {
        this.preview = preview;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public static Pizza generateRandomPizza() {
        Pizza p = new Pizza();
        int uuid = (int) (1000 * Math.random());
        p.setTitle("Random pizza #" + uuid);
        p.setDescription("description: " + uuid);
        p.setPreviewLarge("large/preview/" + uuid);
        p.setPreview("preview/" + uuid);
        p.setPrice((float) (uuid + 231.312));
        p.setId(uuid);
        return p;
    }

    @Override
    public String toString() {
        return "Pizza: " + title;
    }
}
