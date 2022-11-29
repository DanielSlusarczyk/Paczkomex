package pamiw.paczkomex.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Table
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Locker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    private String city;
    private int capacity;
}