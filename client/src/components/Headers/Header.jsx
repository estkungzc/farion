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

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';

import axios from 'axios';

class Header extends React.Component {
  state = {
    pm25: { max: 0, min: 0, avg: 0}
  };

  componentDidMount() {
    axios.get('/api/sensor').then(res => {
      const data = res.data.sensorData;
      // console.log(data);
      this.setState({
        pm25: { max: data.maxPm25, min: data.minPm25, avg: data.avgPm25.toFixed(2) }
      });
    });
  }
  render() {
    return (
      <>
        <div className="header pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="4" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Average - PM2.5
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.pm25.avg > 0 ? this.state.pm25.avg : '...'}
                          </span>
                          {' '}
                          <span className="h4 mb-0">
                            ug/m^3
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-rocket"/>
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className={`${
                          this.state.pm25.avg <= 50 
                          ? 'text-success' 
                          : this.state.pm25.avg <= 100
                            ? 'text-warning' 
                            : 'text-danger'
                        } mr-2`}>
                        <i className={`fas ${
                          this.state.pm25.avg <= 50 
                          ? 'fa-smile' 
                          : this.state.pm25.avg <= 100
                            ? 'fa-grimace' 
                            : 'fa-angry'
                        }`}/> {`${
                          this.state.pm25.avg <= 50 
                          ? 'Good' 
                          : this.state.pm25.avg <= 100
                            ? 'Moderate' 
                            : 'Unhealthy'
                        }`}
                        </span>{' '}
                        <span className="text-nowrap">{`${
                          this.state.pm25.avg <= 50 
                          ? 'Little to no health risk' 
                          : this.state.pm25.avg <= 100
                            ? 'Sensitive individuals' 
                            : 'Harmful'
                        }`}</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Max - PM2.5
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.pm25.max > 0 ? this.state.pm25.max : '...'}
                          </span>
                          {' '}
                          <span className="h4 mb-0">
                            ug/m^3
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-rocket"/>
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                      <span className={`${
                          this.state.pm25.max <= 50 
                          ? 'text-success' 
                          : this.state.pm25.max <= 100
                            ? 'text-warning' 
                            : 'text-danger'
                        } mr-2`}>
                        <i className={`fas ${
                          this.state.pm25.max <= 50 
                          ? 'fa-smile' 
                          : this.state.pm25.max <= 100
                            ? 'fa-grimace' 
                            : 'fa-angry'
                        }`}/> {`${
                          this.state.pm25.max <= 50 
                          ? 'Good' 
                          : this.state.pm25.max <= 100
                            ? 'Moderate' 
                            : 'Unhealthy'
                        }`}
                        </span>{' '}
                        <span className="text-nowrap">{`${
                          this.state.pm25.max <= 50 
                          ? 'Little to no health risk' 
                          : this.state.pm25.max <= 100
                            ? 'Sensitive individuals' 
                            : 'Harmful'
                        }`}</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Min - PM2.5
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.pm25.min > 0 ? this.state.pm25.min : '...'}
                          </span>
                          {' '}
                          <span className="h4 mb-0">
                            ug/m^3
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-rocket"/>
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                      <span className={`${
                          this.state.pm25.min <= 50 
                          ? 'text-success' 
                          : this.state.pm25.max <= 100
                            ? 'text-warning' 
                            : 'text-danger'
                        } mr-2`}>
                        <i className={`fas ${
                          this.state.pm25.min <= 50 
                          ? 'fa-smile' 
                          : this.state.pm25.min <= 100
                            ? 'fa-grimace' 
                            : 'fa-angry'
                        }`}/> {`${
                          this.state.pm25.min <= 50 
                          ? 'Good' 
                          : this.state.pm25.min <= 100
                            ? 'Moderate' 
                            : 'Unhealthy'
                        }`}
                        </span>{' '}
                        <span className="text-nowrap">{`${
                          this.state.pm25.min <= 50 
                          ? 'Little to no health risk' 
                          : this.state.pm25.min <= 100
                            ? 'Sensitive individuals' 
                            : 'Harmful'
                        }`}</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
