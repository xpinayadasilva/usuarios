import { Modal, Form, Button } from 'react-bootstrap';
import { useRef, useContext, useState } from 'react';
import { UserContext } from '../../providers/UserProvider';
import chileanLocations from '../../data/chilean-locations.json';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewUser() {
  const { addUser, getUsers } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState({});
  const form = useRef();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
  function inputHandler(e) {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  }

  const handleClose = () => {
    setNewUser({});
    form.current.reset();
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  async function submitHandler(e) {
    e.preventDefault();

    if (
      !newUser?.name ||
      !newUser?.email ||
      !newUser?.password 
    ) {
      toast.error('Faltan campos obligatorios que deben ser llenados', {
        position: 'bottom-right',
      });
      return;
    } else if (!emailPattern.test(newUser.email)) {
      toast.error('La dirección de correo electrónico no es válida!', {
        position: 'bottom-right',
      });
      return;    
    }
    const data = await addUser(newUser);

    if (data.ok) {
      await getUsers();
      toast.success(data.message, {
        position: 'bottom-right',
      });
      form.current.reset();
      setNewUser({});
      handleClose();
    } else {
      toast.error(data.message, {
        position: 'bottom-right',
      });
    }
  }

  return (
    <>
      <Button variant="success mb-3" onClick={handleShow}>
        Agregar Usuario
      </Button>
      
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Usuario Nuevo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={form} action="submit" onSubmit={(e) => submitHandler(e)}>
            <Form.Floating className="mb-3">
              <Form.Control
                id="name"
                type="text"
                placeholder="Nombre del Usuario"
                onChange={(e) => inputHandler(e)}
              />
              <label htmlFor="name">
                <i className="bi bi-person"></i> Nombre(s) Apellido(s)
              </label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                type="email"
                id="email"
                placeholder="example@example.com"
                onChange={(e) => inputHandler(e)}
              />
              <label htmlFor="email">
                <i className="bi bi-envelope"></i> Correo Electronico
              </label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                type="text"
                id="password"
                placeholder="Contraseña del Usuario"
                onChange={(e) => inputHandler(e)}
              />
              <label htmlFor="password">
                <i className="bi bi-password"></i> Contraseña
              </label>
            </Form.Floating>            
            <div className="text-end">
              <Button variant="secondary me-2 mb-3" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="success mb-3" type="submit">
                Guardar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      
    </>
  );
}
