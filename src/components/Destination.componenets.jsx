import React from 'react'

import Cards from './Card.components'
import { CardGroup, Row, Col, Button } from "react-bootstrap";

const DestinationSection = (props) => {

    return (
        <div className='container'>
            <h1 className='mt-5 mb-5' style={{ fontWeight: "bold" }}>DESTINATION</h1>

            <Row >
                <Col key={1} sm={12} md={6} lg={4} className="mb-4 ">
                    <Cards title={props.state} image={props.imageURL} />
                </Col>
                <Col key={2} sm={12} md={6} lg={4} className="mb-4 ">
                    <Cards title={props.state} image={props.imageURL} />
                </Col>
                <Col key={3} sm={12} md={6} lg={4} className="mb-4 ">
                    <Cards title={props.state} image={props.imageURL} />
                </Col>
                <Col key={4} sm={12} md={6} lg={4} className="mb-4 ">
                    <Cards title={props.state} image={props.imageURL} />
                </Col>
                <Col key={5} sm={12} md={6} lg={4} className="mb-4 ">
                    <Cards title={props.state} image={props.imageURL} />
                </Col>
                <Col key={6} sm={12} md={6} lg={4} className="mb-4 ">
                    <Cards title={props.state} image={props.imageURL} />
                </Col>
            </Row>


            <Button variant="outline-light" style={{ backgroundColor: '#112D58', height: "9vh", width: "27vh", fontWeight: "bold", borderRadius: "20px" }} className='mb-4 mt-4'>More Destination &#8594;</Button>
        </div>
    )
}

export default DestinationSection
