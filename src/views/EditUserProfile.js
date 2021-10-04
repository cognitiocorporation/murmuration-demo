import React from "react";
import TagsInput from "react-tagsinput";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  DatePicker,
  Form,
  FormInput,
  FormSelect,
  FormCheckbox,
  FormRadio,
  FormTextarea,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "shards-react";

import FormSectionTitle from "../components/edit-user-profile/FormSectionTitle";
import ProfileBackgroundPhoto from "../components/edit-user-profile/ProfileBackgroundPhoto";

class EditUserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [
        "User Experience",
        "UI Design",
        "React JS",
        "HTML & CSS",
        "JavaScript",
        "Bootstrap 4"
      ]
    };

    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleTagsChange(tags) {
    this.setState({ tags });
  }

  handleFormSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <Container fluid className="main-content-container px-4">
          <Row>
            <Col lg="12" className="mx-auto mt-4">
              <Card small className="edit-user-details mb-4">
                {/* <ProfileBackgroundPhoto /> */}

                <CardBody className="p-0">

                  {/* Form Section Title :: General */}
                  <Form className="py-4" onSubmit={this.handleFormSubmit}>
                    <FormSectionTitle
                      title="IDEA"
                      description="Somete los detalles y la informacion de la IDEA."
                    />

                    <Row form className="mx-4">
                      <Col lg="12">
                        <Row form>
                          {/* Proponent */}
                          <Col md="4" className="form-group">
                            <label htmlFor="firstName">Proponente</label>
                            <FormInput
                              id="firstName"
                              placeholder="Sierra Brooks"
                              onChange={() => {}}
                            />
                          </Col>

                          {/* Department */}
                          <Col md="4" className="form-group">
                            <label htmlFor="userLocation">Departamento</label>
                            <FormSelect
                              size="sm"
                              value="calidad"
                              onChange={() => {}}
                            >
                            <option value="ingenieria">Ingenieria</option>
                            <option value="calidad">Calidad</option>
                            <option value="mercadeo">Mercadeo</option>
                            <option value="mantenimiento">Mantenimiento</option>
                          </FormSelect>
                          </Col>

                          {/* Date */}
                          <Col md="4" className="form-group">
                          <label htmlFor="lastName">Fecha</label>
                          <InputGroup>
                              <InputGroupAddon type="append">
                                <InputGroupText>
                                  <i className="material-icons">&#xE916;</i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <DatePicker
                                selected={this.state.endDate}
                                onChange={this.handleEndDateChange}
                                placeholderText="today"
                                dropdownMode="select"
                                className="text-center"
                              />
                            </InputGroup>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <br/>

                    <Row form className="mx-4">
                    {/* Categoria */}
                    <Col md="6" className="form-group">
                        <label htmlFor="userBio">Categoria</label>
                          <FormRadio
                            name="fruit"
                          >
                            Seguridad - Eliminar o Mitigar
                          </FormRadio>
                          <FormRadio
                          >
                            Calidad - Eliminar o Mitigar
                          </FormRadio>
                          <FormRadio
                          >
                            Productividad - Realizar tareas para mejorar el tiempo
                          </FormRadio>
                          <FormRadio
                          >
                            Mas Comunes - Mejorar la eficiencia a nivel general
                          </FormRadio>
                      </Col>

                      {/* User Bio */}
                      <Col md="6" className="form-group">
                        <label htmlFor="userBio">Descripcion de la IDEA</label>
                        <FormTextarea
                          style={{ minHeight: "120px" }}
                          id="userBio"
                          placeholder="Escribir descripcion..."
                          onChange={() => {}}
                        />
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter className="border-top">
                  <ButtonGroup size="sm" className="ml-auto d-table mr-3">
                    <Button theme="warning">Guardar</Button>
                    <Button theme="accent">Continuar</Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default EditUserProfile;
