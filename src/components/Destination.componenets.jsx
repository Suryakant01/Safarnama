import React from 'react'

import Cards from './Card.components'
import { CardGroup, Row, Col, Button } from "react-bootstrap";

const DestinationSection = (props) => {

    return (
        <div>
            <h1 className='mt-5 mb-5' style={{ fontWeight: "bold" }}>DESTINATION</h1>

            <Row >
                <Col key={1} sm={12} md={6} lg={4} className="mb-4 ">
                    <Cards title="Uttar Pradesh" image="https://firebasestorage.googleapis.com/v0/b/bookify-59edc.appspot.com/o/uploads%2Fbooks%2FcoverPic%2F1719687831942-IMG20240104065917.jpg?alt=media&token=ab9a1196-203a-44ce-843e-2b0fe6834b9e" />
                </Col>
                <Col key={2} sm={12} md={6} lg={4} className="mb-4 ">
                    <Cards title="Uttar Pradesh" image="https://firebasestorage.googleapis.com/v0/b/bookify-59edc.appspot.com/o/uploads%2Fbooks%2FcoverPic%2F1719687831942-IMG20240104065917.jpg?alt=media&token=ab9a1196-203a-44ce-843e-2b0fe6834b9e" />
                </Col>
                <Col key={2} sm={12} md={6} lg={4} className="mb-4 ">
                    <Cards title="Uttar Pradesh" image="https://firebasestorage.googleapis.com/v0/b/bookify-59edc.appspot.com/o/uploads%2Fbooks%2FcoverPic%2F1719687831942-IMG20240104065917.jpg?alt=media&token=ab9a1196-203a-44ce-843e-2b0fe6834b9e" />
                </Col>
                <Col key={2} sm={12} md={6} lg={4} className="mb-4 ">
                    <Cards title="Uttar Pradesh" image="https://firebasestorage.googleapis.com/v0/b/bookify-59edc.appspot.com/o/uploads%2Fbooks%2FcoverPic%2F1719687831942-IMG20240104065917.jpg?alt=media&token=ab9a1196-203a-44ce-843e-2b0fe6834b9e" />
                </Col>
                <Col key={5} sm={12} md={6} lg={4} className="mb-4 ">
                    <Cards title="Uttar Pradesh" image="https://firebasestorage.googleapis.com/v0/b/bookify-59edc.appspot.com/o/uploads%2Fbooks%2FcoverPic%2F1719687831942-IMG20240104065917.jpg?alt=media&token=ab9a1196-203a-44ce-843e-2b0fe6834b9e" />
                </Col>
                <Col key={6} sm={12} md={6} lg={4} className="mb-4 ">
                    <Cards title="Uttar Pradesh" image="https://firebasestorage.googleapis.com/v0/b/bookify-59edc.appspot.com/o/uploads%2Fbooks%2FcoverPic%2F1719687831942-IMG20240104065917.jpg?alt=media&token=ab9a1196-203a-44ce-843e-2b0fe6834b9e" />
                </Col>
            </Row>


            <Button variant="outline-light" style={{ backgroundColor: '#112D58', height: "9vh", width: "27vh", fontWeight: "bold", borderRadius: "20px" }} className='mb-4 mt-4'>More Destination &#8594;</Button>
        </div>
    )
}

export default DestinationSection
