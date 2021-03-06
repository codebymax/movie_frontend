import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';

const AccountModal = ({
  show,
  page,
  setShow,
  setUser,
  setGenre,
  setScreen,
  setPage,
  setMovies,
}) => {
  const handleClose = () => setShow(0);

  const onClickGenre = async (e, item) => {
    setScreen(item.label);
    if (item.user !== '') {
      setMovies([]);
      setPage(1);
      const resp = await axios.get(
        `http://localhost:5000/` + item.user + `/genre/?genre=` + item.label + `&page=` + page
      );
      setMovies(resp.data.movies);
      //$('.sidebar').height((50 * resp.data.movies.length).toString() + 'px');
    }
  };

  const buildGenre = (genre, user_id) => {
    return {
      name: genre.toLowerCase(),
      label: genre,
      user: user_id,
      onClick: onClickGenre,
    };
  };

  const login = async () => {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    const resp = await axios.get(
      `http://localhost:5000/user/auth?username=` +
        username +
        `&password=` +
        password
    );
    if (resp.data.response === 1) {
      const user_id = resp.data.message;
      setUser(user_id);
      const resp2 = await axios.get(
        `http://localhost:5000/` + user_id + `/genre/list`
      );
      setShow(0);
      const genre_list = resp2.data.genres.map(genre =>
        buildGenre(genre, user_id)
      );
      setGenre({ name: 'movie_genre', label: 'Genres', items: genre_list });
      $('.sidebar').height((50 * genre_list.length).toString() + 'px');
    } else {
      document.getElementById('login-error').style.display = 'block';
    }
  };

  if (show === 1) {
    //when user is logging in
    const showBool = true;
    return (
      <>
        <Modal show={showBool} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p id='login-error' style={{ color: 'crimson', display: 'none' }}>
              Incorrect username or password
            </p>
            <Form>
              <Form.Row style={{ paddingBottom: '15px' }}>
                <Form.Control
                  id='username'
                  type='text'
                  placeholder='Username'
                />
              </Form.Row>
              <Form.Row>
                <Form.Control
                  id='password'
                  type='password'
                  placeholder='Password'
                />
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='primary' onClick={login}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else {
    //when user is signing up
    const showBool = show === 2 ? true : false;
    return (
      <>
        <Modal show={showBool} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row style={{ paddingBottom: '15px' }}>
                <Form.Control
                  id='newUsername'
                  type='text'
                  placeholder='Username'
                />
              </Form.Row>
              <Form.Row style={{ paddingBottom: '15px' }}>
                <Form.Control
                  id='newPassword'
                  type='password'
                  placeholder='Password'
                />
              </Form.Row>
              <Form.Row>
                <Form.Control
                  id='samePassword'
                  type='password'
                  placeholder='Re-type Password'
                />
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='primary' onClick={handleClose}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
};

export default AccountModal;
