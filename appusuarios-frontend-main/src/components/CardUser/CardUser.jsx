import { Card } from 'react-bootstrap';
import DeleteUser from '../DeleteUser/DeleteUser';
import UpdateUser from '../UpdateUser/UpdateUser';
import './CardUser.css';

export default function CardUser({ user }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Text className="d-flex flex-column">
          <span>
            <i className="bi bi-envelope"></i> {user.email}
          </span>
          <span>
            <i className="bi bi-password"></i> {user.password}
          </span>          
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-end">
        <UpdateUser user={user} />
        <DeleteUser id={user.id} />
      </Card.Footer>
    </Card>
  );
}
