import * as React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import { useLocation } from "react-router-dom";

const PageNotFound = () => {
  const { pathname } = useLocation();

  return (
    <Container>
      <Row>
        <Col>
          <div className="d-flex flex-fill align-items-center container">
            <div className="row w-100">
              <div
                className="col-12 col-md-8 col-lg-5 mx-auto"
                style={{ marginTop: "10%" }}
              >
                <div
                  style={{
                    backgroundColor: "#fff",
                  }}
                  className="card shadow-sm rounded p-4 border-0"
                >
                  <div className="card-body text-center d-flex flex-column justify-content-center">
                    <span
                      style={{ color: "black" }}
                      className="empty-details"
                    >
                      Erreur 404
                    </span>
                    <span
                      style={{ color: "#0d6efd" }}
                      className="h4 empty-heading mt-3"
                    >
                      Page non trouvée
                    </span>
                    <span
                      style={{ color: "black" }}
                      className="empty-details"
                    >
                      {/* <p>  La Page <font color="#AD0000">{pathname} </font>est introuvable</p> */}
                      La Page{" "}
                      <span style={{ color: "#0d6efd" }}>{pathname}</span> est
                      introuvable
                    </span>
   
                    <span className="h4 empty-heading mt-3">
                      <Button
                        href="/"
                      >
                        Revenir a l'accueil
                      </Button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PageNotFound;
