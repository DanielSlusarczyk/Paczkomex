import {Container, Table} from "reactstrap";
import {useEffect, useState} from "react";
import {lockersApi} from "../../api/lockersApi";

export const LockerPage = () => {
    const [lockers, setLockers] = useState([]);

    useEffect(() => {
        lockersApi.getAll().then((res)=> {
            setLockers(res.data);
        })
    }, []);

    const lockerList = lockers.map(locker => {
        return <tr key={locker.id}>
            <td style={{whiteSpace: 'nowrap'}}>{locker.id}</td>
            <td style={{whiteSpace: 'nowrap'}}>{locker.city}</td>
            <td style={{whiteSpace: 'nowrap'}}>{locker.load}/{locker.capacity}</td>
        </tr>
    });

    return (
        <div>
            <Container fluid>
                <h3>Available lockers</h3>
                <Table >
                    <thead>
                    <tr>
                        <th width="200px">Id</th>
                        <th>City</th>
                        <th>Load</th>
                    </tr>
                    </thead>
                    <tbody>
                    {lockerList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}