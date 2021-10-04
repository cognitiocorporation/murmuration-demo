import React from "react";
import { Container, Row, Col, Button, ButtonGroup, Modal, ModalHeader, ModalBody, ListGroup, ListGroupItem } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Editor from "../components/add-new-post/Editor";
import SidebarActions from "../components/add-new-post/SidebarActions";
import IdeaCategories from "../components/administration/IdeaCategories";
import Departments from "../components/administration/Departments";
import Questions from "../components/administration/Questions";
import PropertyManager from "../components/administration/PropertyManager";
import CompleteFormExample from "../components/components-overview/CompleteFormExample";
import NewUser from "../components/components-overview/NewUser";
import IdeaQuestions from "../components/ecommerce/IdeaQuestions";
import UserList from "../components/ecommerce/UserList";
import CreateCommiteeForm from "../components/components-overview/CreateCommiteeForm";
import UserTeams from "./../components/user-profile/UserTeams";
import { useTranslation, initReactI18next } from "react-i18next";
import Parse from 'parse';
import { useState, setValue } from 'react';



function Administration() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(0);
  const [modalTitle, setModalTitle] = useState(1);
  const [modalMembers, setModalMembers] = useState([]);

  const handleModalOpen = (data) => {

    // Set Data
    setModalTitle(data.get("name"))
    setModalMembers(data.get("members"))
    console.log(data.get("members"))
    const newOpen = !open;
    setOpen(newOpen);
  }

  const handleModalClose = (data) => {
    // Set Data
    const newOpen = !open;
    setOpen(newOpen);
  }

  const deleteAllIdeas = () => {
    var shouldDeleteIdeas = window.confirm(t('RESET_MSG'));
    if (shouldDeleteIdeas) {
      var Idea =  new Parse.Schema('Idea');
      // var ideas = new Idea();
      Idea.purge().then(()=> {
        console.log('IDEAS DELETED')
      })
    }
  }

  return(
    <div>

    {/* Eval Committee Modal*/}

    <Modal open={open} toggle={handleModalClose.bind(this)}>
      <ModalHeader>{modalTitle}</ModalHeader>
      <ModalBody>
       
        <ListGroup>
        {modalMembers.map((item,i) => 
          <ListGroupItem>{item.name + ' --- ' + item.email}</ListGroupItem>
        )}
          {/* <ListGroupItem>Cras justo odio</ListGroupItem>
          <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem>Morbi leo risus</ListGroupItem>
          <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
          <ListGroupItem>Vestibulum at eros</ListGroupItem> */}
        </ListGroup>
        
      </ModalBody>
    </Modal>

    <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
    <PageTitle sm="4" title={t('ADMINISTRATION_TITLE')} subtitle={t('ADMINISTRATION_SUBTITLE')} className="text-sm-left" />

      {/* Page Header :: Actions */}
      <Col xs="12" sm="8" className="col d-flex align-items-center">
        <ButtonGroup size="sm" className="d-inline-flex mb-3 mb-sm-0 mx-auto">
          <Button theme="white" onClick={() => deleteAllIdeas()}>
            {t('RESET')}
          </Button>
          {/* <Button theme="white" tag={NavLink} to="/historial-reconocimiento">
            History
          </Button> */}
        </ButtonGroup>
      </Col>
    </Row>
    <Row>
      <Col lg="8" md="12">
        <UserList/>
      </Col>
      <Col lg="4" md="12">
        <NewUser/>
      </Col>
    </Row>
    {/* <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title={t('ADMINISTRATION_TITLE')} subtitle={t('ADMINISTRATION_SUBTITLE')} className="text-sm-left" />
    </Row>
    <Row noGutters>
      <PageTitle sm="4" title={t('ADMINISTRATION_TITLE')} subtitle={t('ADMINISTRATION_SUBTITLE')} className="text-sm-left" />
      <Button pill outline size="sm" theme="danger">
        <i class="fas fa-eye"></i>
      </Button>
      
    </Row> */}
    <Row>
      <Col lg="6" md="6">
        <CreateCommiteeForm title={t('EVAL_COMMITTEES')}/>
      </Col>
      <Col lg="6" md="6">
        <UserTeams toggle={handleModalOpen.bind(this)}/>
      </Col>
    </Row>
    <Row>
      {/* Sidebar Widgets */}
      {/* <Col lg="3" md="12">
        <PropertyManager title="Categorias" className="IdeaCategory" actionTitle="Nueva Categoria"/>
      </Col>
      <Col lg="3" md="12">
        <PropertyManager title="Departamentos" className="IdeaDepartment" actionTitle="Nuevo Departamento"/>
      </Col> */}
      <Col lg="3" md="12">
        <PropertyManager title={t('CATEGORIES')} className="IdeaCategory" actionTitle="Nueva Categoria"/>
      </Col>
      <Col lg="3" md="12">
        <PropertyManager title={t('DEPARTMENTS')} className="IdeaDepartment" actionTitle="New Department"/>
      </Col>
      <Col lg="6" md="12">
        <CompleteFormExample/>
      </Col>
      <Col lg="12" md="12">
        <IdeaQuestions/>
      </Col>
    </Row>
  </Container>
  </div>
  )
}

export default Administration;