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
public class Package {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    private String name;
    @OneToOne
    @JoinColumn(name = "dest_locker_id", referencedColumnName = "id")
    private Locker destLocker;
    @OneToOne
    @JoinColumn(name = "src_locker_id", referencedColumnName = "id")
    private Locker srcLocker;
}
