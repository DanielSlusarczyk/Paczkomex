import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import {packagesApi} from "../../api/packagesApi";

export const PackagePage = () => {
  const [parcels, setPackages] = useState([]);

  useEffect(() => {
    packagesApi.getAll()
    .then((res) => {
      setPackages(res.data);
    })
  }, []);

  const remove = (id) => {
    packagesApi.delete(id)
    .then(() => {
      setPackages((parcels) => parcels.filter((parcel) => parcel.id !== id));
    });
  }

  const parcelList = parcels.map(parcel => {
    return <tr key={parcel.id}>
      <td style={{whiteSpace: 'nowrap'}}>{parcel.id}</td>
      <td style={{whiteSpace: 'nowrap'}}>{parcel.name}</td>
      <td align="center">
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/parcels/" + parcel.id}>
            Edite
          </Button>
          <Button size="sm" color="danger" onClick={() => remove(parcel.id)}>
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  });

  return (
      <div>
        <Container fluid>
          <h3>Parcel</h3>
          <Table striped bordered hover size="sm">
            <thead>
            <tr>
              <th width="80px">Id</th>
              <th>Name</th>
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
            <Button color="success" tag={Link} to="/parcels/new">
              Add
            </Button>
          </div>
        </Container>
      </div>
  );
}
