import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Container, Col, Row, Form, FormControlProps } from "react-bootstrap";

import { RenderAfterNavermapsLoaded } from "react-naver-maps";
import NaverMaps from "./NaverMaps";

const Maps = () => {
  const [gender, setGender] = useState("all"); // male, female, all
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {}, [dateTime]);

  const setDate = date => {
    setDateTime(date);
  };

  const genderChanged = event => {
    setGender(event.target.value);
  };

  return (
    <div>
      <Container>
        <Row className="mt-3">
          <Col xs={12}>
            <Form.Group controlId="Instrument">
              <Row>
                <Col>
                  <Form.Label>성별</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={genderChanged}
                    id="gender"
                  >
                    <option value="all" selected>
                      모두
                    </option>
                    <option value="male">남자</option>
                    <option value="female">여자</option>
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Label>성별</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={genderChanged}
                    id="gender"
                  >
                    <option value="all" selected>
                      모두
                    </option>
                    <option value="male">남자</option>
                    <option value="female">여자</option>
                  </Form.Control>
                </Col>
              </Row>
            </Form.Group>
          </Col>
          <Col>
            <DatePicker
              selected={dateTime}
              onChange={setDate}
              dateFormat="yyyy-MM-dd"
            />
          </Col>
        </Row>
      </Container>
      <RenderAfterNavermapsLoaded ncpClientId={"i3enee60g7"}>
        <NaverMaps></NaverMaps>
      </RenderAfterNavermapsLoaded>
    </div>
  );
};

export default Maps;
