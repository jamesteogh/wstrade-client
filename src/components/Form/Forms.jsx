import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const Forms = () => {
  return (
    <Form>
      <Row className="mb-3">

      <Form.Group className="mb-3" controlId="stocktracker">
        <Form.Label>Stock to Track</Form.Label>
        <Form.Control type="text" placeholder="Enter Ticker Symbol" />
      </Form.Group>

      <Form.Group as={Col} controlId="numofshares">
          <Form.Label>No. of Shares Bought</Form.Label>
          <Form.Control type="number" placeholder="Input number" />
        </Form.Group>

        <Form.Group as={Col} controlId="stockprice">
          <Form.Label>Purchased Stock Price</Form.Label>
          <Form.Control type="number" placeholder="$" />
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Add to Watchlist
      </Button>
    </Form>
  )
}

export default Forms