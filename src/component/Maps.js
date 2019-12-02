import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Container,
  Col,
  Row,
  Form,
  FormControl,
  Button,
  ButtonGroup,
  Badge
} from "react-bootstrap";
import { RenderAfterNavermapsLoaded } from "react-naver-maps";
import NaverMaps from "./NaverMaps";
import axios from "axios";
import { animateScroll as scroll } from "react-scroll";
import "../css/Map.css";
import {
  FaSistrix,
  FaEraser,
  FaChevronUp,
  FaChevronDown
} from "react-icons/fa";

const Maps = () => {
  const [searchWord, setSearchWord] = useState("");
  const [searchResults, setSearchResults] = useState([]); //{"name": string, "jibun_address": string, "x": number, "y": number}

  const [gender, setGender] = useState("all"); // M, F, all
  const [age, setAge] = useState("all"); // 10,20,30,40,50,60, all
  const [dateTime, setDateTime] = useState(new Date());

  const [datas, setDatas] = useState([]); //{id : string, locations : [], }
  const [filteredDatas, setFilteredDatas] = useState([]); //{id : string, locations : [], }
  const [center, setCenter] = useState({ lat: 37.586159, lng: 127.028882 }); //{lat : number, lng : number}

  const searchUrl =
    "/map-place/v1/search?query=" +
    searchWord +
    "&coordinate=" +
    center.lng +
    "," +
    center.lat;

  let tempMonth = dateTime.getMonth() + 1;
  let tempDate = dateTime.getDate();
  if (tempMonth < 10) tempMonth = "0" + tempMonth;
  if (tempDate < 10) tempDate = "0" + tempDate;

  const apiUrl =
    "http://mr-y.asuscomm.com:3000/company?centerX=" +
    center.lng +
    "&centerY=" +
    center.lat +
    "&radius=100&date=" +
    dateTime.getFullYear().toString() +
    tempMonth +
    tempDate;

  const searchLoca = async () => {
    const datas = await axios({
      url: searchUrl,
      method: "GET",
      headers: {
        "X-NCP-APIGW-API-KEY-ID": "i3enee60g7",
        "X-NCP-APIGW-API-KEY": "JTVfs0VlgOvgGhIfQcRSDFOnh4YBovQ6R4b8x7ki"
      }
    });
    setSearchResults(datas.data.places);
  };

  const fetchDatas = async () => {
    console.log(apiUrl);
    const getDatas = await axios.get(apiUrl);
    console.log("New Data arrvied.. \n", getDatas.data);
    setDatas(getDatas.data);
    setFilteredDatas(getDatas.data);
  };

  const filtering = () => {
    if (gender === "all") {
      if (age === "all") setFilteredDatas(datas);
      else if (age === "60")
        setFilteredDatas(datas.filter(data => data.age >= 60));
      else setFilteredDatas(datas.filter(data => data.age == age));
    } else {
      if (age === "all")
        setFilteredDatas(datas.filter(data => data.gender === gender));
      else if (age === "60")
        setFilteredDatas(
          datas
            .filter(data => data.gender === gender)
            .filter(data => data.age >= 60)
        );
      else
        setFilteredDatas(
          datas
            .filter(data => data.gender === gender)
            .filter(data => data.age === age)
        );
    }
  };

  //날짜, 중심좌표가 바뀌었을때 API호출
  useEffect(() => {
    console.log("New data requested..");
    fetchDatas();
  }, [dateTime, center, dateTime]);

  useEffect(() => {
    console.log("Data filtering..");
    filtering();
  }, [gender, age]);

  return (
    <div>
      <Container id="header">
        <Row>
          <Col xs={12} md={6} className="mt-3">
            <Form.Group>
              <Row>
                <Col>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    onChange={event => {
                      setSearchWord(event.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <Button variant="outline-info" onClick={searchLoca}>
                    <FaSistrix></FaSistrix>
                  </Button>
                  <span> </span>
                  <Button
                    variant="outline-danger"
                    onClick={e => {
                      setSearchResults([]);
                    }}
                  >
                    <FaEraser></FaEraser>
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {searchResults.map(item => {
            return (
              <Col xs={12} md={6} className="text-white mb-1">
                <Button
                  variant="info"
                  onClick={e => {
                    setCenter({ lat: item.y, lng: item.x });
                  }}
                >
                  {item.name}
                  <span> </span>
                  <Badge variant="warning">{item.jibun_address}</Badge>
                </Button>
              </Col>
            );
          })}
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Control
                    as="select"
                    onChange={event => {
                      setGender(event.target.value);
                    }}
                  >
                    <option value="all" selected>
                      나이 - 모두
                    </option>
                    <option value="M">남자</option>
                    <option value="F">여자</option>
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Control
                    as="select"
                    onChange={event => {
                      setAge(event.target.value);
                    }}
                  >
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
                    onChange={date => {
                      setDateTime(date);
                    }}
                    dateFormat="yyyy-MM-dd"
                  />
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
      </Container>
      <RenderAfterNavermapsLoaded ncpClientId={"i3enee60g7"}>
        <NaverMaps datas={filteredDatas} center={center}></NaverMaps>
      </RenderAfterNavermapsLoaded>

      <div id="scrollTool">
        <div className="text-danger">
          총 {filteredDatas.length}명<br></br>
        </div>
        <ButtonGroup>
          <Button
            variant="dark"
            onClick={e => {
              scroll.scrollToTop();
            }}
          >
            <FaChevronUp></FaChevronUp>
          </Button>
          <Button
            variant="danger"
            onClick={e => {
              scroll.scrollToBottom();
            }}
          >
            <FaChevronDown></FaChevronDown>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Maps;
