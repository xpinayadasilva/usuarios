import { Modal, Form, Button } from 'react-bootstrap';
import { useRef, useContext, useState, useEffect } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateUser({ user }) {
  const { updateUser, getUsers, users } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState(user);  
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const form = useRef();
  
  function inputHandler(e) {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  }

  const handleClose = () => {
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
      toast.error('Faltan campos obligatorios por llenar!', {
        position: 'bottom-right',
      });
      return;
    } else if (!emailPattern.test(newUser.email)) {
      toast.error('Escribe una dirección de correo electrónico válida!', {
        position: 'bottom-right',
      });
      return;
    } else if (!phonePatten.test(newUser.phone)) {
      toast.error('Escribe un telefono valido. Ej: 912345678!', {
        position: 'bottom-right',
      });
      return;
    }
    const data = await updateUser(newUser);

    if (data.ok) {
      await getUsers();
      form.current.reset();
      toast.success(data.message, {
        position: 'bottom-right',
      });
      handleClose();
    } else {
      toast.error(data.message, {
        position: 'bottom-right',
      });
    }
  }

  useEffect(() => {
    setNewUser(user);
  }, [users]);

  return (
    <>
      <Button variant="secondary" size="sm" onClick={handleShow}>
        Actualizar
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
          <Modal.Title>Actualizar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={form} action="submit" onSubmit={(e) => submitHandler(e)}>
            <Form.Floating className="mb-3">
              <Form.Control
                id="name"
                type="text"
                placeholder="Nombre del Usuario"
                value={newUser.name}
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
                value={newUser.email}
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
                value={newUser.phone}
                onChange={(e) => inputHandler(e)}
              />
              <label htmlFor="password">
                <i className="bi bi-password"></i> 
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
