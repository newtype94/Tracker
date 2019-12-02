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
import request from "request";

const Search = () => {
  const [center, setCenter] = useState({ lat: 37.586159, lng: 127.028882 }); //{lat : number, lng : number}
  const [searchWord, setSearchWord] = useState("");
  const [searches, setSearches] = useState([]); //{"name": string, "jibun_address": string, "x": number, "y": number}

  const url =
    "/map-place/v1/search?query=" +
    searchWord +
    "&coordinate=" +
    center.lng +
    "," +
    center.lat;

  const searchLoca = async () => {
    const datas = await axios({
      url,
      method: "GET",
      headers: {
        "X-NCP-APIGW-API-KEY-ID": "i3enee60g7",
        "X-NCP-APIGW-API-KEY": "JTVfs0VlgOvgGhIfQcRSDFOnh4YBovQ6R4b8x7ki"
      }
    });
    setSearches(datas.data.places);
  };

  return (
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
    </Container>
  );
};

export default Search;
