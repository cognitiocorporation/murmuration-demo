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

const preloadFilterQs = {
  "results" : [
  
    {
      // "objectId": "eiNjHe5cTU",
      "question": "¿Test?",
      // "createdAt": "2020-08-06T19:04:19.410Z",
      // "updatedAt": "2021-03-11T19:39:00.039Z",
      "ideaType": "innovacion",
      "filter": "innovacion",
      "questionTrans": {
        "en": "Is this IDEA an innovation?",
        "es": "¿Es una IDEA de innovación?"
      },
      "field": false
    },
    {
      // "objectId": "g5WPiE8Vf7",
      "question": "¿Problema?",
      // "createdAt": "2020-08-06T19:33:23.007Z",
      // "updatedAt": "2021-03-11T19:53:25.246Z",
      "ideaType": "solucion",
      "filter": "solucion",
      "questionTrans": {
        "en": "What problem are you trying to solve or issue to improve?",
        "es": "¿Qué problema estamos tratando de solucionar o situación tratando de mejorar?"
      },
      "field": true
    },
    {
      // "objectId": "ddMl4LKkHB",
      "question": "¿Problema?",
      // "createdAt": "2020-08-06T20:38:19.085Z",
      // "updatedAt": "2021-03-11T19:53:28.049Z",
      "filter": "solucion\n",
      "ideaType": "solucion",
      "questionTrans": {
        "en": "What is happening?",
        "es": "¿Qué está ocurriendo?"
      },
      "field": true
    },
    {
      // "objectId": "hEwwMMlqtB",
      "question": "¿Problema?",
      // "createdAt": "2020-08-06T20:38:58.950Z",
      // "updatedAt": "2021-03-11T19:53:29.478Z",
      "ideaType": "solucion",
      "filter": "solucion",
      "questionTrans": {
        "en": "Where is it happening?",
        "es": "¿Dónde está ocurriendo?"
      },
      "field": true
    },
    {
      // "objectId": "OayzxRYeiW",
      "ideaType": "solucion",
      // "createdAt": "2020-08-06T20:39:30.816Z",
      // "updatedAt": "2021-03-11T19:53:34.102Z",
      "filter": "solucion",
      "questionTrans": {
        "en": "What is its frequency? (Use numbers)",
        "es": "¿Con qué frecuencia está ocurriendo?"
      },
      "question": "¿Problema?",
      "field": true
    },
    {
      // "objectId": "HqPGjfXw5x",
      "ideaType": "solucion",
      // "createdAt": "2020-08-06T20:40:03.742Z",
      // "updatedAt": "2021-03-11T19:53:35.141Z",
      "filter": "solucion",
      "questionTrans": {
        "en": "What is the symptom? (What is observed)",
        "es": "¿Cuál es el síntoma o dolor de cabeza?"
      },
      "question": "¿Problema?",
      "field": true
    },
    {
      // "objectId": "9obpm2yazl",
      "ideaType": "solucion",
      // "createdAt": "2020-08-06T20:41:21.728Z",
      // "updatedAt": "2021-03-11T19:53:36.503Z",
      "filter": "solucion",
      "questionTrans": {
        "en": "Which metric is being impacted?",
        "es": "¿Qué métrica está siendo afectada?"
      },
      "question": "¿Problema?",
      "field": true
    },
    {
      // "objectId": "uFsvT6A8IG",
      "ideaType": "solucion",
      // "createdAt": "2020-08-06T20:42:08.167Z",
      // "updatedAt": "2021-03-11T19:53:37.784Z",
      "filter": "solucion",
      "questionTrans": {
        "en": "How does it deviate from normal conditions?",
        "es": "¿Cómo se diferencia de las condiciones normales?"
      },
      "question": "¿Problema?",
      "field": true
    },
    {
      // "objectId": "Df30NQnqX3",
      "ideaType": "innovacion",
      // "createdAt": "2020-08-06T20:54:24.152Z",
      // "updatedAt": "2021-03-11T19:53:39.155Z",
      "filter": "innovacion",
      "questionTrans": {
        "en": "Is this IDEA aligned to the business strategy?",
        "es": "¿Esta alineada a la estrategia de negocios?"
      },
      "question": "¿Test?",
      "field": false
    },
    {
      // "objectId": "o4C8pMvwrw",
      "ideaType": "innovacion",
      // "createdAt": "2020-08-06T20:54:52.556Z",
      // "updatedAt": "2021-03-11T19:44:06.440Z",
      "filter": "innovacion",
      "questionTrans": {
        "en": "What resources are needed to implement this IDEA?",
        "es": "¿Qué recursos son necesarios para implementar esta IDEA?"
      },
      "question": "¿Test?",
      "field": true
    },
    {
      // "objectId": "VvuL5twimt",
      "ideaType": "innovacion",
      // "createdAt": "2020-08-06T20:55:18.158Z",
      // "updatedAt": "2021-03-11T19:53:42.026Z",
      "filter": "innovacion",
      "questionTrans": {
        "en": "How much time will it take to implement it?",
        "es": "¿Cuánto tiempo tomara implementarla?"
      },
      "question": "¿Test?",
      "field": true
    },
    {
      // "objectId": "b5Quw3Ca9i",
      "question": "¿Since when is it happening?",
      // "createdAt": "2021-03-11T19:37:50.598Z",
      // "updatedAt": "2021-03-11T19:52:53.966Z",
      "ideaType": "solucion",
      "filter": "solucion",
      "questionTrans": {
        "en": "Since when is it happening?",
        "es": "¿Desde cuando ocurre?"
      },
      "field": true
    }
  ]
  }

const preloadQs = {
  "results" : [
  
    {
      // "objectId": "ZRFCbTqKGQ",
      "questionTrans": {
        "en": "Does this idea simplify a process or a document? (e.g. documentation error reduction, reduce process steps)",
        "es": "¿Simplifica un documento o proceso? ( por ejemplo: reduce errores de documentación, elimina pasos redundantes)"
      },
      "required": false,
      "question": "Does this idea simplify a process or a document?",
      "category": "Calidad",
      // "createdAt": "2021-05-07T10:21:06.885Z",
      // "updatedAt": "2021-05-26T22:03:38.894Z",
      "field": false
    },
    {
      // "objectId": "8iJ7q1H81B",
      "questionTrans": {
        "en": "Does this idea help to align current process practices with a procedure?",
        "es": "¿Ayuda a alinear el procedimiento o proceso con las prácticas actuales?"
      },
      "required": false,
      "question": "Does this idea help to align current process practices with a procedure?",
      "category": "Calidad",
      // "createdAt": "2021-05-07T10:21:37.334Z",
      // "updatedAt": "2021-05-26T21:48:34.565Z",
      "field": false
    },
    {
      // "objectId": "Q7fvKHNVUk",
      "questionTrans": {
        "en": "Does this idea help to prevent defects, regulatory issues, product recall or customer complaints?",
        "es": "¿Ayuda a prevenir a corregir defectos, situaciones regulatorias, o situaciones en el mercado como recogido de producto, quejas de clientes?"
      },
      "required": false,
      "question": "Does this idea help to prevent defects, regulatory issues, product recall or customer complaints?",
      "category": "Calidad",
      // "createdAt": "2021-05-07T10:21:56.929Z",
      // "updatedAt": "2021-05-26T21:48:33.681Z",
      "field": false
    },
    {
      // "objectId": "x7cDV8PE0Z",
      "questionTrans": {
        "en": "Does this idea help in reducing the process steps and reducing non-value added activities?",
        "es": "¿Ayuda esta idea a simplificar un proceso reduciendo la cantidad de pasos y eliminando tareas que no añaden valor? \n"
      },
      "required": false,
      "question": "Does this idea help in reducing the process steps and reducing non-value added activities?",
      "category": "Productividad",
      "createdAt": "2021-05-07T10:23:10.953Z",
      "updatedAt": "2021-05-26T21:48:32.984Z",
      "field": false
    },
    {
      // "objectId": "6OeH4AEsHs",
      "questionTrans": {
        "en": "Does this idea help to reduce the execution times without compromising quality? How much?\n",
        "es": "¿Ayuda esta idea a reducir los tiempos de ejecución sin sacrificar la calidad? ¿Por cuánto?\n"
      },
      "required": false,
      "question": "Does this idea help to reduce the execution times without compromising quality? How much?\n",
      "category": "Productividad",
      // "createdAt": "2021-05-07T10:23:27.350Z",
      // "updatedAt": "2021-05-07T10:35:30.094Z",
      "field": true
    },
    {
      // "objectId": "YRoMuTFPCD",
      "questionTrans": {
        "en": "Does this idea help to achieve the  strategic projects defined in Baxter Guayama within its timeframe?",
        "es": "¿Ayuda esta idea a alcanzar los proyectos estratégicos de Baxter Guayama dentro del tiempo establecido?"
      },
      "required": false,
      "question": "Does this idea help to achieve the  strategic projects defined in Baxter Guayama within its timeframe?",
      "category": "Productividad",
      // "createdAt": "2021-05-07T10:23:48.845Z",
      // "updatedAt": "2021-05-26T21:48:32.173Z",
      "field": false
    },
    {
      // "objectId": "qQlHUQAxKb",
      "questionTrans": {
        "en": "Does this idea help to improve %OEE?",
        "es": "¿Ayuda esta idea a mejorar el OEE?"
      },
      "required": false,
      "question": "Does this idea help to improve %OEE? How much?",
      "category": "Productividad",
      // "createdAt": "2021-05-07T10:24:06.728Z",
      // "updatedAt": "2021-05-21T11:32:02.742Z",
      "field": false
    },
    {
      // "objectId": "kwyCwyrKuh",
      "questionTrans": {
        "en": "Does this idea help to reduce costs and comply with site cost reduction initiatives? ",
        "es": "¿Ayuda esta idea reducir los costos y cumplir con la meta de reducciones de costo?"
      },
      "required": false,
      "question": "Does this idea help to reduce costs and comply with site cost reduction initiatives? ",
      "category": "Cost Competitiveness",
      // "createdAt": "2021-05-07T10:24:25.920Z",
      // "updatedAt": "2021-05-26T21:48:30.974Z",
      "field": false
    },
    {
      // "objectId": "y6sHFE54zQ",
      "questionTrans": {
        "en": "Does this idea help to reduce materials inventory levels? How much? ",
        "es": "¿Ayuda esta idea a reducir los inventarios de materiales? ¿Por cuánto?"
      },
      "required": false,
      "question": "Does this idea help to reduce materials inventory levels? How much? ",
      "category": "Cost Competitiveness",
      // "createdAt": "2021-05-07T10:24:38.961Z",
      // "updatedAt": "2021-05-07T10:34:43.674Z",
      "field": true
    },
    {
      // "objectId": "dk7yNDkBzz",
      "questionTrans": {
        "en": "Does this idea help in developing a positive workplace environment?",
        "es": "Ayuda a crear un ambiente positivo de trabajo"
      },
      "required": false,
      "question": "Does this idea help in developing a positive workplace environment?",
      "category": "Best Place to Work",
      // "createdAt": "2021-05-07T10:25:01.972Z",
      // "updatedAt": "2021-05-26T21:48:29.982Z",
      "field": false
    },
    {
      // "objectId": "K80t0Xbidy",
      "questionTrans": {
        "en": "Does this idea help in developing new skills and competencies?",
        "es": "Ayuda a desarrollar nuevas destrezas y conocimiento"
      },
      "required": false,
      "question": "Does this idea help in developing new skills and competencies?",
      "category": "Best Place to Work",
      // "createdAt": "2021-05-07T10:25:41.426Z",
      // "updatedAt": "2021-05-26T21:48:29.353Z",
      "field": false
    },
    {
      // "objectId": "QhcQ80zd9J",
      "questionTrans": {
        "en": "Does this idea enhance the knowledge and accountability on the Environment Management System and Programs? (e.g. ISO 14001)\n",
        "es": "¿Ayuda esta idea a mejorar el conocimiento y responsabilidad en el manejo ambiental y sus programas? (eg. ISO 14001)\n"
      },
      "required": false,
      "question": "Does this idea enhance the knowledge and accountability on the Environment Management System and Programs? (e.g. ISO 14001)\n",
      "category": "EHS y Cumplimiento",
      // "createdAt": "2021-05-07T10:30:27.232Z",
      // "updatedAt": "2021-05-26T21:48:28.627Z",
      "field": false
    },
    {
      // "objectId": "BLLG9UtMdu",
      "questionTrans": {
        "en": "Does this idea help to reduce  Energy and Water Consumption and/or minimize Waste? How much? \n",
        "es": "¿Ayuda esta idea a reducir el consumo de agua, energía y desperdicios?  \n¿Por cuánto?"
      },
      "required": false,
      "question": "Does this idea help to reduce  Energy and Water Consumption and/or minimize Waste? How much? \n",
      "category": "EHS y Cumplimiento",
      // "createdAt": "2021-05-07T10:30:52.099Z",
      // "updatedAt": "2021-05-07T10:33:56.960Z",
      "field": true
    },
    {
      // "objectId": "VW7F3sEpz5",
      "questionTrans": {
        "en": "Does this idea foster employee EHSS accountability and an interdependent EHSS culture?",
        "es": "¿Promueve esta idea la cultura de EHSS y la responsabilidad individual y de grupo en los comportamientos correctos? "
      },
      "required": false,
      "question": "Does this idea foster employee EHSS accountability and an interdependent EHSS culture?",
      "category": "EHS y Cumplimiento",
      // "createdAt": "2021-05-07T10:31:07.637Z",
      // "updatedAt": "2021-05-26T21:48:27.733Z",
      "field": false
    },
    {
      // "objectId": "J5qEjFP68F",
      "questionTrans": {
        "en": "my question",
        "es": "mi pregunta"
      },
      "required": false,
      "question": "my question",
      "category": "Todas",
      "field": true,
      // "createdAt": "2021-05-14T01:17:17.495Z",
      // "updatedAt": "2021-05-14T01:24:47.863Z"
    },
    {
      // "objectId": "s4HHvDkRDk",
      "questionTrans": {
        "en": "By how much does this idea help to improve %OEE? (Increase %)",
        "es": "¿Por cuánto ayuda esta idea a mejorar el OEE? (% de Mejora)"
      },
      // "createdAt": "2021-05-21T11:32:58.096Z",
      // "updatedAt": "2021-05-21T11:35:01.944Z",
      "question": "By how much does this idea help to improve %OEE?",
      "field": true,
      "category": "Productividad",
      "required": false
    }
  ]
  }



function AdministrationPreguntas() {
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
      var Idea =  new Parse.Schema('IdeaQuestion');
      var Filter =  new Parse.Schema('FilterQuestion');
      // var ideas = new Idea();
      Idea.purge().then(()=> {
        Filter.purge().then(() => {
          alert('Success!')
        })
      })
    }
  }

  const deleteAllIdeasResults = () => {
    var shouldDeleteIdeas = window.confirm(t('RESET_MSG'));
    if (shouldDeleteIdeas) {
      var Idea =  new Parse.Schema('Idea');
      var Result =  new Parse.Schema('Result');
      var Verification =  new Parse.Schema('Verification');
      var Recognition =  new Parse.Schema('Recognition');
      // var ideas = new Idea();
      Idea.purge().then(()=> {
        Result.purge().then(() => {
          Verification.purge().then(() => {
            Recognition.purge().then(() => {
              alert('Success!')
            })
          })
        })
      })
    }
  }

  const importAllQuestions = () => {
    var shouldDeleteIdeas = window.confirm(t('QUESTION_IMPORT_MSG'));
    if (shouldDeleteIdeas) {

      const questions = []

      preloadQs.results.map((question) => {
        const className = "IdeaQuestion";
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
          importFilterQuestions()
        }, (error) => {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          console.log(error)
          alert('Hubo un error en la operacion: ' + error.message);
        });
      }
    }

    const importFilterQuestions = () => {
      // var shouldDeleteIdeas = window.confirm(t('QUESTION_IMPORT_MSG'));
      // if (shouldDeleteIdeas) {
  
        const questions = []
  
        preloadFilterQs.results.map((question) => {
          const className = "FilterQuestion";
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
          <Button theme="white" onClick={() => importAllQuestions()}>
            {t('IMPORT_QUESTIONS')}
          </Button>
          <Button theme="white" onClick={() => deleteAllIdeasResults()}>
            {t('RESET_IDEAS')}
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
    {/* <Row>
      <Col lg="6" md="6">
        <CreateCommiteeForm title={t('EVAL_COMMITTEES')}/>
      </Col>
      <Col lg="6" md="6">
        <UserTeams toggle={handleModalOpen.bind(this)}/>
      </Col>
    </Row> */}
    <Row>
      {/* Sidebar Widgets */}
      {/* <Col lg="3" md="12">
        <PropertyManager title="Categorias" className="IdeaCategory" actionTitle="Nueva Categoria"/>
      </Col>
      <Col lg="3" md="12">
        <PropertyManager title="Departamentos" className="IdeaDepartment" actionTitle="Nuevo Departamento"/>
      </Col> */}
      {/* {/* <Col lg="3" md="12"> */}
        {/* <PropertyManager title={t('CATEGORIES')} className="IdeaCategory" actionTitle="Nueva Categoria"/>
      </Col>
      <Col lg="3" md="12">
        <PropertyManager title={t('DEPARTMENTS')} className="IdeaDepartment" actionTitle="New Department"/>
      </Col> */}
      <Col lg="12" md="12">
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

export default AdministrationPreguntas;