import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';

const MovieCardBig = props => {
  const movie = props.movie;
  const [color, setColor] = React.useState('white')
  const hover_color = '#bbbbbb'

  return (
    <>
      <Card
        onClick={props.onClick}
        bg={color}
        style={{
          width: '100%',
          boxShadow: '1px 1px 2px 0px rgba(97,106,107,1)',
          backgroundColor: color
        }}
        onMouseEnter={() => setColor(hover_color)}
        onMouseLeave={() => setColor('white')}
      >
        <Card.Body>
          <Row>
            <Col md={4} style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>
                <strong>Release: </strong>
                {movie.release_date}
              </Card.Text>
              <Card.Text>
                <strong>Director: </strong>
                {movie.director.join(', ')}
              </Card.Text>
              <Card.Text>
                <strong>Cast: </strong>
                {movie.cast.join(', ')}
              </Card.Text>
            </Col>
            <Col md={3} style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <Card.Text>
                <strong>Genres: </strong>
                {movie.genres.join(', ')}
              </Card.Text>
              <Card.Text>
                <strong>Rating: </strong>
                {movie.rating}
              </Card.Text>
              <Card.Text>
                <strong>Runtime: </strong>
                {movie.runtime} min
              </Card.Text>
            </Col>
            <Col md={3} style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <Card.Text>
                <strong>Tomato: </strong>
                {movie.reviews['Rotten Tomatoes']}
              </Card.Text>
              <Card.Text>
                <strong>Metascore: </strong>
                {movie.reviews['Metascore']}
              </Card.Text>
            </Col>
            <Col md={2}>
              <Image
                src={movie.posterPath}
                thumbnail
                style={{ maxHeight: '180px' }}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default MovieCardBig;
