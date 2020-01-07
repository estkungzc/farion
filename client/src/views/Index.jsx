/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
// node.js library that concatenates classes (strings)
// javascipt plugin for creating charts
import Chart from 'chart.js';
// react plugin used to create charts
import { Bar } from 'react-chartjs-2';
// reactstrap components
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  CardBody
} from 'reactstrap';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample2
} from 'variables/charts.jsx';

import Header from 'components/Headers/Header.jsx';
import axios from 'axios';
import moment from 'moment';

class Index extends React.Component {
  state = {
    activeNav: 1,
    chartExample1Data: 'data1',
    locData: [],
    sensorData: {}
  };
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === 'data1' ? 'data2' : 'data1'
    });
    let wow = () => {
      console.log(this.state);
    };
    wow.bind(this);
    setTimeout(() => wow(), 1000);
    // this.chartReference.update();
  };
  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }

    axios.get('/api/sensor').then(res => {
      const dataLoc =
        !!res.data.locData && res.data.locData.length > 10
          ? res.data.locData.slice(0,11)
          : res.data.locData;
      const dataSensor =
        res.data.sensorData && res.data.sensorData.pm25data.length > 20
          ? res.data.sensorData.pm25data.slice(-20,-1)
          : res.data.sensorData.pm25data;
      console.log(dataSensor);
      console.log(moment().format("MMM Do YYYY, H:mm:ss"));
      let chart = {
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function(value) {
                    if (!(value % 10)) {
                      //return '$' + value + 'k'
                      return value;
                    }
                  }
                }
              }
            ]
          },
          tooltips: {
            callbacks: {
              label: function(item, data) {
                var label = data.datasets[item.datasetIndex].label || "";
                var yLabel = item.yLabel;
                var content = "";
                if (data.datasets.length > 1) {
                  content += label;
                }
                content += yLabel;
                return `${content} ug/m^3`;
              }
            }
          }
        },
        data: {
          labels: dataSensor.map(e => moment(e.timestamp).format("MMM Do YYYY, H:mm:ss")),
          datasets: [
            {
              label: "PM2.5",
              data: dataSensor.map(e => e.pm25),
            }
          ]
        }
      };
      this.setState({
        locData: dataLoc,
        sensorData: chart
      });
    });
  }
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Top 10 Location</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Index</th>
                      <th scope="col">Latitude</th>
                      <th scope="col">Longitude</th>
                      <th scope="col">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.locData.map((e, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{e.lat}</td>
                        <td>{e.long}</td>
                        <td>{e.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
          <Row className="mt-5">
            <Col>
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Air quality
                      </h6>
                      <h2 className="mb-0">PM2.5</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Bar
                      data={this.state.sensorData.data}
                      options={this.state.sensorData.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
