import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Col, Row, Form } from "react-bootstrap";
import { RenderAfterNavermapsLoaded } from "react-naver-maps";
import NaverMaps from "./NaverMaps";
import axios from "axios";
import samples from "../data/20191111.js";

const Maps = () => {
  const [gender, setGender] = useState("all"); // male, female, all
  const [age, setAge] = useState("all"); // 10,20,30,40,50,60, all
  const [loca, setLoca] = useState([]); //{lat : number, lng : number}
  const [dateTime, setDateTime] = useState(new Date());

  const url = "https://opensource.adobe.com/Spry/data/json/array-02.js";
  const getDatas = async () => {
    const datas = await axios.get(url);

    setLoca(
      samples.reduce((acc, current) => {
        acc.push({ lat: current.lat, lng: current.lng });
        return acc;
      }, [])
    );
    console.log(loca);
  };

  useEffect(() => {
    getDatas();
  }, [dateTime]);

  const dateChanged = date => {
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
              onChange={dateChanged}
              dateFormat="yyyy-MM-dd"
            />
          </Col>
        </Row>
      </Container>
      <RenderAfterNavermapsLoaded ncpClientId={"i3enee60g7"}>
        <NaverMaps locates={loca}></NaverMaps>
      </RenderAfterNavermapsLoaded>
    </div>
  );
};

export default Maps;
