import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Container,
  Col,
  Row,
  Form,
  FormControl,
  Button
} from "react-bootstrap";
import { RenderAfterNavermapsLoaded } from "react-naver-maps";
import NaverMaps from "./NaverMaps";
import axios from "axios";
import samples from "../data/20191111.js";

const Maps = () => {
  const [gender, setGender] = useState("all"); // male, female, all
  const [age, setAge] = useState("all"); // 10,20,30,40,50,60, all
  const [locas, setLocas] = useState([]); //{lat : number, lng : number}
  const [center, setCenter] = useState({ lat: 37.586159, lng: 127.028882 }); //{lat : number, lng : number}
  const [searchWord, setSearchWord] = useState("");
  const [searches, setSearches] = useState([]); //{"name": string, "jibun_address": string, "x": number, "y": number}
  const [dateTime, setDateTime] = useState(new Date());

  const url = "https://opensource.adobe.com/Spry/data/json/array-02.js";
  const searchUrl =
    "https://naveropenapi.apigw.ntruss.com/map-place/v1/search?query=" +
    searchWord +
    "&coordinate=" +
    searches.y +
    "," +
    searches.x;

  const searchLoca = async () => {
    const datas = await axios.get(searchUrl);

    setSearches(
      samples.reduce((acc, current) => {
        acc.push({ lat: current.lat, lng: current.lng });
        return acc;
      }, [])
    );
    console.log(locas);
  };

  const getDatas = async () => {
    const datas = await axios.get(url);

    setLocas(
      samples.reduce((acc, current) => {
        acc.push({ lat: current.lat, lng: current.lng });
        return acc;
      }, [])
    );
    console.log(locas);
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

  const ageChanged = event => {
    setAge(event.target.value);
  };

  return (
    <div>
      <Container>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={event => {
                  setSearchWord(event.target.value);
                }}
              />
              <Button variant="outline-info" onClick={searchLoca}>
                Search
              </Button>
            </Form>
          </Col>
          <Col xs={12} md={6}></Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12}>
            <Form.Group controlId="Instrument">
              <Row>
                <Col>
                  <Form.Control as="select" onChange={genderChanged}>
                    <option value="all" selected>
                      나이 - 모두
                    </option>
                    <option value="male">남자</option>
                    <option value="female">여자</option>
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Control as="select" onChange={ageChanged}>
                    <option value="all" selected>
                      연령대 - 모두
                    </option>
                    <option value="10">10대</option>
                    <option value="20">20대</option>
                    <option value="30">30대</option>
                    <option value="40">40대</option>
                    <option value="50">50대</option>
                    <option value="60">60대</option>
                  </Form.Control>
                </Col>
                <Col>
                  <DatePicker
                    selected={dateTime}
                    onChange={dateChanged}
                    dateFormat="yyyy-MM-dd"
                  />
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
      </Container>
      <RenderAfterNavermapsLoaded ncpClientId={"i3enee60g7"}>
        <NaverMaps locates={locas} center={center}></NaverMaps>
      </RenderAfterNavermapsLoaded>
    </div>
  );
};

export default Maps;
