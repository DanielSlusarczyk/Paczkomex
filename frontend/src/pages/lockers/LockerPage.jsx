import {Container, Table} from "reactstrap";
import {useEffect, useState} from "react";
import {lockersApi} from "../../api/lockersApi";
import SockJS from 'sockjs-client';

let stompClient = null;

export const LockerPage = () => {
    const [lockers, setLockers] = useState([]);
    useEffect(() => {
       const fetch = async () => {
        const res = await lockersApi.getAll()
        const data = await Promise.all(res.data.map(async lock => {
            lock.load = (await lockersApi.getLoad(lock.id)).data;
            console.log(lock.load)
            return lock
        }))
        setLockers(data);
        }

        fetch();
    }, []);

    const connect = () => {
        const Stomp = require("stompjs");
        var SockJS = require("sockjs-client");
        SockJS = new SockJS("http://localhost:8080/ws");
        stompClient = Stomp.over(SockJS);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        console.log("Test");
    };

    const onError = (err) => {
        console.log("Error connecting!");
    };

    connect();

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