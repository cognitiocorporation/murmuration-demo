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

const pCats = {
  "results" : [
  
    {
      // "objectId": "7PW0QkYVbS",
      "itemName": "Accion Inmediata",
      // "createdAt": "2020-07-20T17:21:39.969Z",
      // "updatedAt": "2021-03-11T18:22:43.493Z",
      "show": true,
      "itemNameTrans": {
        "en": "Immediate Action",
        "es": "Acción Inmediata"
      },
      "extra": false,
      "icon": "ClockImage",
      "color": "#DDB153"
    },
    {
      // "objectId": "3yny1QCIay",
      "itemName": "Productividad",
      // "createdAt": "2020-07-20T17:23:23.408Z",
      // "updatedAt": "2021-03-11T18:22:42.421Z",
      "show": true,
      "itemNameTrans": {
        "en": "Productivity",
        "es": "Productividad"
      },
      "extra": false,
      "icon": "ChartImage",
      "color": "#7FA86F"
    },
    {
      // "objectId": "YD86MdsqeT",
      "itemName": "Calidad",
      // "createdAt": "2020-07-20T17:23:39.818Z",
      // "updatedAt": "2021-05-07T10:28:37.318Z",
      "show": true,
      "itemNameTrans": {
        "en": "Quality and Compliance",
        "es": "Calidad y Cumplimiento"
      },
      "extra": false,
      "icon": "ShieldImage",
      "color": "#3A7BBB"
    },
    {
      // "objectId": "GVnOTySGrI",
      "itemName": "Cost Competitiveness",
      // "createdAt": "2021-03-11T17:37:50.520Z",
      // "updatedAt": "2021-05-07T10:27:17.135Z",
      "itemNameTrans": {
        "en": "Cost Competitiveness",
        "es": "Costo"
      },
      "show": true,
      "extra": true,
      "icon": "DollarImage",
      "color": "#7B0828"
    },
    {
      // "objectId": "kUUXVtRnCY",
      "itemNameTrans": {
        "en": "EHS and Compliance",
        "es": "EHS y Cumplimiento"
      },
      // "createdAt": "2021-05-07T10:27:41.227Z",
      // "updatedAt": "2021-05-12T20:37:47.860Z",
      "extra": true,
      "icon": "",
      "show": true,
      "itemName": "EHS y Cumplimiento"
    },
    {
      // "objectId": "xw1TwvbnKz",
      "itemName": "Best Place to Work",
      // "createdAt": "2021-05-27T15:12:03.196Z",
      // "updatedAt": "2021-05-27T15:13:36.049Z",
      "itemNameTrans": {
        "en": "Best Place to Work",
        "es": "Best Place to Work"
      },
      "extra": true,
      "show": true,
      "icon": "TeamImage"
    }
  ]
  }

  const pDepts = {
    "results" : [
    
      {
        // "objectId": "Ivip1J9lmA",
        "itemNameTrans": {
          "en": "Planta 1",
          "es": "Planta 1"
        },
        "itemName": "Planta 1",
        // "createdAt": "2021-03-11T19:34:59.077Z",
        // "updatedAt": "2021-05-14T00:41:11.296Z",
        "show": true
      },
      {
        // "objectId": "HOzho7SFAG",
        "itemNameTrans": {
          "en": "Planta 2",
          "es": "Planta 2"
        },
        "itemName": "Planta 2",
        // "createdAt": "2021-03-11T19:35:05.299Z",
        // "updatedAt": "2021-03-11T19:36:35.019Z",
        "show": true
      },
      {
        // "objectId": "I34ypRi9O2",
        "itemNameTrans": {
          "en": "Fill & Pack",
          "es": "Fill & Pack"
        },
        "itemName": "Fill & Pack",
        // "createdAt": "2021-03-11T19:35:17.338Z",
        // "updatedAt": "2021-05-14T00:41:09.053Z",
        "show": true
      },
      {
        // "objectId": "M6YznFNi2Z",
        "itemNameTrans": {
          "en": "GPF",
          "es": "GPF"
        },
        "itemName": "GPF",
        // "createdAt": "2021-03-11T19:35:24.674Z",
        // "updatedAt": "2021-05-14T00:41:19.217Z",
        "show": true
      },
      {
        // "objectId": "wQ1S3CXFTw",
        "itemNameTrans": {
          "en": "EHSS",
          "es": "EHSS"
        },
        "itemName": "EHSS",
        // "createdAt": "2021-03-11T19:35:32.037Z",
        // "updatedAt": "2021-03-11T19:36:36.331Z",
        "show": true
      },
      {
        // "objectId": "dBBvBfbLuI",
        "itemNameTrans": {
          "en": "Quality Control, Operations and Compliance",
          "es": "Quality Control, Operations and Compliance"
        },
        "itemName": "Quality Control, Operations and Compliance",
        // "createdAt": "2021-03-11T19:36:00.797Z",
        // "updatedAt": "2021-05-14T00:41:07.951Z",
        "show": true
      },
      {
        // "objectId": "xaKS29suXU",
        "itemNameTrans": {
          "en": "Ingenieria",
          "es": "Ingenieria"
        },
        "itemName": "Ingenieria",
        // "createdAt": "2021-03-11T19:36:10.682Z",
        // "updatedAt": "2021-05-14T00:41:17.453Z",
        "show": true
      },
      {
        // "objectId": "R2CJGFgxpc",
        "itemNameTrans": {
          "en": "Administracion",
          "es": "Administracion"
        },
        "itemName": "Administracion",
        // "createdAt": "2021-03-11T19:36:17.689Z",
        // "updatedAt": "2021-05-14T00:41:15.529Z",
        "show": true
      },
      {
        // "objectId": "0wHCJf6j7U",
        "itemNameTrans": {
          "en": "OpEx",
          "es": "OpEx"
        },
        "itemName": "OpEx",
        // "createdAt": "2021-03-11T19:36:24.987Z",
        // "updatedAt": "2021-03-11T19:36:38.207Z",
        "show": true
      },
      {
        // "objectId": "NW3wfIk38E",
        "itemNameTrans": {
          "en": "Recursos Humanos",
          "es": "Recursos Humanos"
        },
        "itemName": "Recursos Humanos",
        // "createdAt": "2021-03-11T19:36:32.343Z",
        // "updatedAt": "2021-05-14T00:41:13.313Z",
        "show": true
      }
    ]
    }


function AdministrationCatsDepts() {
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
      var Idea =  new Parse.Schema('IdeaCategory');
      var Dept =  new Parse.Schema('IdeaDepartment');
      // var ideas = new Idea();
      Idea.purge().then(()=> {
        Dept.purge().then(() => {
          alert('Success.')
        })
      })
    }
  }

  const importAllCats = () => {
    var shouldDeleteIdeas = window.confirm(t('QUESTION_IMPORT_MSG'));
    if (shouldDeleteIdeas) {

      const questions = []

      pCats.results.map((question) => {
        const className = "IdeaCategory";
        const PropertyItem = Parse.Object.extend(className);
        const newItem = new PropertyItem();
        newItem.set(question)
        questions.push(newItem)
      })

      console.log(questions)
      Parse.Object.saveAll(questions, {useMasterKey: true})
        .then((item) => {
        // Execute any logic that should take place after the object is saved.
          // this.resetForm()
          // alert('¡La operacion fue exitosa!');
          importDepartments()
        }, (error) => {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          console.log(error)
          alert('Hubo un error en la operacion: ' + error.message);
        });
      }
    }

    const importDepartments = () => {
      // var shouldDeleteIdeas = window.confirm(t('QUESTION_IMPORT_MSG'));
      // if (shouldDeleteIdeas) {
  
        const questions = []
  
        pDepts.results.map((question) => {
          const className = "IdeaDepartment";
          const PropertyItem = Parse.Object.extend(className);
          const newItem = new PropertyItem();
          newItem.set(question)
          questions.push(newItem)
        })
  
        console.log(questions)
        Parse.Object.saveAll(questions, {useMasterKey: true})
          .then((item) => {
          // Execute any logic that should take place after the object is saved.
            // this.resetForm()
            alert('¡La operacion fue exitosa!');
          }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            console.log(error)
            alert('Hubo un error en la operacion: ' + error.message);
          });
        // }
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
          <Button theme="white" onClick={() => importAllCats()}>
            {t('IMPORT_CATS_DEPTS')}
          </Button>
          {/* <Button theme="white" tag={NavLink} to="/historial-reconocimiento">
            History
          </Button> */}
        </ButtonGroup>
      </Col>
    </Row>
    {/* <Row>
      <Col lg="8" md="12">
        <UserList/>
      </Col>
      <Col lg="4" md="12">
        <NewUser/>
      </Col>
    </Row> */}
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
        <PropertyManager title="Categorias" className="IdeaCategory" actionTitle="Nueva Categoria"/>
      </Col>
      <Col lg="6" md="6">
        <PropertyManager title="Departamentos" className="IdeaDepartment" actionTitle="Nuevo Departamento"/>
      </Col>
    </Row>
    {/* <Row> */}
      {/* Sidebar Widgets */}
      {/* <Col lg="3" md="12">
        <PropertyManager title="Categorias" className="IdeaCategory" actionTitle="Nueva Categoria"/>
      </Col>
      <Col lg="3" md="12">
        <PropertyManager title="Departamentos" className="IdeaDepartment" actionTitle="Nuevo Departamento"/>
      </Col> */}
      {/* <Col lg="3" md="12">
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
    </Row> */}
  </Container>
  </div>
  )
}

export default AdministrationCatsDepts;