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
    @GeneratedValue
    @Column
    private Long id;
    private String city;
}