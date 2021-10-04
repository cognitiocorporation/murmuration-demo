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
import { useFlexLayout } from "react-table";
import Select from 'react-select';


function AdministrationComite() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(0);
  const [modalTitle, setModalTitle] = useState(1);
  const [cData, setcData] = useState(1);
  const [modalMembers, setModalMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([])
  const [coms, setComs] = useState([]);
  const [options, setOptions] = useState([]);

  const handleModalOpen = (data) => {
    fetchCategoryData();
    // Set Data
    setcData(data)
    setModalTitle(data.get("name"))
    setModalMembers(data.get("members"))
    console.log(data.get("members"))
    const newOpen = !open;
    setOpen(newOpen);
  }

  const fetchCategoryData = () => {
    const className = "User";

    var ItemClass = Parse.Object.extend(className);
    var query = new Parse.Query(ItemClass);
    query.limit(1000)
    query.ascending("firstName").find()
    .then((results) => {
        const myOptions = []
        {
            results.map((result, idx) => myOptions.push({"value":result, "label":getFullName(result)}))
        }
        
        setOptions(myOptions)
        // this.props.setResponsible(results[0], -1);
    }, (error) => {
        setOptions([])
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and message.
    });
  }

  const addMembers = (members) => {
    // const { committees } = this.state;
    // const oldComms = commitees; 
    // oldComms.push({"name":" ", "email": " " });
    console.log(members)
  //   this.setState(prevState => ({
  //     committees: prevState.committees.concat({"name":" ", "email": " " })
  // }));
    setSelectedMembers(members)
    // this.setState({value: this.props.value});
  }

  const handleModalClose = (data) => {
    // Set Data
    const newOpen = !open;
    setOpen(newOpen);
  }


  const getFullName = (result) => {
    if (result) {
        return result.get("firstName") + ' ' + result.get("lastName");
    }
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

  const removeUser = (item, i) => {
    // Remover el "Value" del EvaluationCommittee de la lista de "evaluationCriteria" del usuario.
    // Una vez el paso anterior hay sido succesfull, elimina al usuario de la lista de "members" del EvaluationCommittee
    // Necesito el User object y el EvaluationCommittee object
    deleteSelectedCriteria(item.value)
  }

  const deleteSelectedCriteria = async (item) => {
    const evalCriteria = item.get("evaluationCriteria")
    const cEvaluatingBy = cData.get("value")
    var filteredCriteria = evalCriteria.filter(function(e) { return e !== cEvaluatingBy })
    console.log(cEvaluatingBy)
    console.log(evalCriteria)
    console.log(filteredCriteria)
    // item.save('', {useMasterKey: true})
    // .then((userData) => {
    //   // The object was retrieved successfully.
    //   console.log(userData);
    // }, (error) => {
    //   // The object was not retrieved successfully.
    //   // error is a Parse.Error with an error code and message.
    //   console.log(error);
    // });
    const query = new Parse.Query(Parse.User);
    const myUser = await query.get(item.id)
    myUser.set("evaluationCriteria", filteredCriteria)
    Parse.Object.saveAll([myUser], {useMasterKey: true}).then(() => {
      deleteUserFromC(myUser)
    });
    
    // this.setNotifications();
  }

  const deleteUserFromC = async(myUser) => {
    const currMembers = cData.get("members")
    var filteredMembers = currMembers.filter(function(e, i) { return e.value.id !== myUser.id })
    

    cData.set("members", filteredMembers)
    Parse.Object.saveAll([cData], {useMasterKey: true}).then(() => {
      if(window.confirm('¡La operacion fue exitosa!')) {
        window.location.reload()
      };
    });
  }

  const addUsers = async(myUser) => {
    // const currMembers = cData.get("members")
    // var filteredMembers = currMembers.filter(function(e, i) { return e.value.id !== myUser.id })

    // cData.set("members", filteredMembers)
    // Parse.Object.saveAll([cData], {useMasterKey: true}).then(() => {
    //   if(window.confirm('¡La operacion fue exitosa!')) {
    //     window.location.reload()
    //   };
    // });
    const allMembers = modalMembers.concat(selectedMembers)
    console.log(modalMembers)
   

    cData.set("members", allMembers);


    var evaluationType = cData.get("evaluationType")
    var value = cData.get("value")
    var parseObjs = []
    Parse.Object.saveAll([cData], {useMasterKey: true})
    .then((item) => {
      if (evaluationType == 'manage') {
        selectedMembers.forEach((obj) => {
          const member = obj.value
          if (member.get("role") != 'super_user') {
            const type = getType(value)
  
            if (value == 'PMO') {
              member.set("pmo", true);
            }
            
            member.set("role", type);
            parseObjs.push(member);
          }
          
      });
      } else {
        selectedMembers.forEach((obj) => {
          const member = obj.value
          if (member.get("role") != 'super_user') {
  
            var evaluationCriteria = member.get("evaluationCriteria")
            evaluationCriteria.push(value)
            member.set("role", 'evaluation');
            member.set("evaluationCriteria", evaluationCriteria);
            parseObjs.push(member);
          }
        });
      }
  
      Parse.Object.saveAll(parseObjs, {useMasterKey: true}).then(() => {
        alert('¡La operacion fue exitosa!');
      }, (error) => {
        console.log(error)
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Hubo un error en la operacion: ' + error.message);
      });
    
    })
  }

  const getType = (value) => {
    switch(value) {
      case 'Evaluación':
        // code block
        return 'evaluation'
      case 'Verificación':
        // code block
        return 'verification'
      case 'Reconocimiento':
        // code block
        return 'recognition'
      case 'PMO':
        // code block
        return 'evaluation'
      default:
        // code block
    }
  }

  // Get all committees
  const setupNewCs = () => {
    // Get all committees
    // Go through every member in the committee and add the "value" to the "evaluationCriteria" array
    // Go through every member in the committee and activate the respective boolean "pmo" or "verificationType"
    // Update the user
    // Save
    const className = "EvaluationCommittee";
    var ItemClass = Parse.Object.extend(className);
    var query = new Parse.Query(ItemClass);
    // const loadData = () => {
    // if (teams == '') {
    query.find()
    .then((results) => {
        console.log(results);
        addNewCriteria(results)
    }, (error) => {
      alert('Hubo un error en la busqueda de comites de evaluacion.');
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and message.
    });     
  }

  const addNewCriteria = (coms) => {
    // console.log('MY COMS')
    // coms.forEach((comite, i) => console.log(comite));
    var parseObjs = []
    coms.map((comite) => {
      const evaluationType = comite.get("evaluationType")
      const members = comite.get("members")
      const value = comite.get("value")
      console.log(comite)
      if (evaluationType == 'manage') {
        members.forEach((obj) => {
          console.log(obj)
          const member = obj.value
          if (member.get("role") != 'super_user') {
            const type = getType(value)

            if (value == 'PMO') {
              member.set("pmo", true);
            }
            member.set("role", type);
            parseObjs.push(member);
          }
          
      });
      } else {
        members.forEach((obj) => {
          console.log(obj)
          const member = obj.value
          if (member.get("role") != 'super_user') {

            var evaluationCriteria = member.get("evaluationCriteria")
            evaluationCriteria.push(value)
            member.set("role", 'evaluation');
            member.set("evaluationCriteria", evaluationCriteria);
            parseObjs.push(member);
          }
        });
      }
      })
      Parse.Object.saveAll(parseObjs, {useMasterKey: true}).then(() => {
        console.log(parseObjs)
      });
  }

  const updateMembers = (members) => {
    members.map((member) => {

    })
  }

  console.log(modalMembers)
  console.log(options)
  return(
    <div>

    {/* Eval Committee Modal*/}

    <Modal open={open} toggle={handleModalClose.bind(this)}>
      <ModalHeader>{modalTitle}</ModalHeader>
      <ModalBody>
      <label htmlFor="feInputAddress2">{t('EVAL_COMMITTEE_MEMBER')}</label>
        <ListGroup>
        {modalMembers.map((item,i) => 
          <Row style={{marginBottom: 10}}>
            <Col md={10}>
              <ListGroupItem>{item.label}</ListGroupItem>
            </Col>
            <Col style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Button theme="danger" onClick={() => removeUser(item, i)}>x</Button>
            </Col>
            </Row>
        )}
        <label htmlFor="feInputAddress2">{t('EVAL_COMMITTEE_ADD_MEMBERS')}</label>
        <Select
            value={selectedMembers}
            onChange={(members) => addMembers(members)}
            isMulti
            options={options}
            placeholder={'Seleccione Empleados'}
            clearable={false}
        />
        <Button disabled={selectedMembers?selectedMembers.length == 0:true} onClick={() => addUsers()}>{t('EVAL_COMMITTEE_ADD')}</Button>
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
        <CreateCommiteeForm title={t('EVAL_COMMITTEES')}/>
      </Col>
      <Col lg="6" md="6">
        <UserTeams toggle={handleModalOpen.bind(this)} />
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

export default AdministrationComite;