import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import {packagesApi} from "../../api/packagesApi";

export const PackagePage = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    packagesApi.getAll()
    .then((res) => {
      setPackages(res.data);
    })
  }, []);

  const remove = (id) => {
    packagesApi.delete(id)
    .then(() => {
      setPackages((packages) => packages.filter((pack) => pack.id !== id));
    });
  }

  const parcelList = packages.map(pack => {

    return <tr key={pack.id}>
      <td style={{whiteSpace: 'nowrap'}}>{pack.id}</td>
      <td style={{whiteSpace: 'nowrap'}}>{pack.name}</td>
      <td style={{whiteSpace: 'nowrap'}}>{pack.srcLocker != null ? pack.srcLocker.city : "Brak"}</td>
      <td style={{whiteSpace: 'nowrap'}}>{pack.destLocker != null ? pack.destLocker.city : "Brak"}</td>
      <td align="center">
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/packages/" + pack.id}>
            Edite
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
