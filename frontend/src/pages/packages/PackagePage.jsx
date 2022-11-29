import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import {packagesApi} from "../../api/packagesApi";
import {lockersApi} from "../../api/lockersApi";
import Select from 'react-select'

export const PackagePage = () => {
    const [packages, setPackages] = useState([]);
    const [lockers, setLockers] = useState([]);

    useEffect(() => {
        packagesApi.getAll()
            .then((res) => {
                setPackages(res.data);
            })
        lockersApi.getAll()
            .then((res) => {
                setLockers(res.data)
            })
    }, []);

    const remove = (id) => {
        packagesApi.delete(id)
            .then(() => {
                setPackages((packages) => packages.filter((pack) => pack.id !== id));
        });
    }

    const setDestination = (id, lockerId) => {
        packagesApi.setDestination(id, lockerId)
    }

    const setSource = (id, lockerId) => {
        packagesApi.setSource(id, lockerId)
    }

    const options = lockers.map( locker => { return {value: locker.id, label: locker.city} });

    const parcelList = packages.map(pack => {
        const destLocker = pack.destLocker
        const srcLocker = pack.srcLocker
        const defaultDestValue = {value: destLocker != null ? destLocker.id : null, label: destLocker != null ? destLocker.city : "Select..."}
        const defaultSrcValue = {value: srcLocker != null ? srcLocker.id : null, label: srcLocker != null ? srcLocker.city : "Select..."}

        return <tr key={pack.id}>
            <td style={{whiteSpace: 'nowrap'}}>{pack.id}</td>
            <td style={{whiteSpace: 'nowrap'}}>{pack.name}</td>
            <td style={{whiteSpace: 'nowrap'}}>
            {<Select defaultValue={defaultSrcValue} options={options} onChange= {e => setSource(pack.id, e.value)}/>}
            </td>
            <td style={{whiteSpace: 'nowrap'}}>
                {<Select defaultValue={defaultDestValue} options={options} onChange= {e => setDestination(pack.id, e.value)}/>}
            </td>
            <td align="center">
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/packages/" + pack.id}>
                        Edit
                    </Button>
                    <Button size="sm" color="danger" onClick={() => remove(pack.id)}>
                        Delete
                    </Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <Container fluid>
                <h3>Package</h3>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th width="40px">Id</th>
                        <th width="100px">Name</th>
                        <th width="80px">From</th>
                        <th width="80px">To</th>
                        <th width="120px">
                            <div align="center">Action</div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {parcelList}
                    </tbody>
                </Table>
                <div className="float-right">
                    <Button color="success" tag={Link} to="/packages/new">
                        Add
                    </Button>
                </div>
            </Container>
        </div>
    );
}
