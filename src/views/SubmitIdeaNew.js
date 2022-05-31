import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col, Button, ButtonGroup } from "shards-react";
import { NavLink } from "react-router-dom";
import Parse from 'parse';

import PageTitle from "../components/common/PageTitle";
import SubmitIdeaForm from "../components/common/SubmitIdeaForm";
import { v4 as uuidv4 } from 'uuid';

import colors from "../utils/colors";

import { ReactComponent as SubmitIcon} from "../images/submit_new_new.svg"
import { ReactComponent as SubmitIconNosel } from "../images/submit_new_nosel.svg"
import { ReactComponent as NextIcon } from "../images/NextIcon.svg"
import { ReactComponent as NextIconValid } from "../images/NextIconSelected.svg"
import { ReactComponent as DivisorBarIcon } from "../images/edited_divisor.svg"
import { ReactComponent as HomeIcon } from "../images/home.svg"
import { ReactComponent as PreviousIcon } from "../images/PreviousIcon.svg"

import OldIdeas from "../assets/baxter_idea_data.json"


import { useTranslation, initReactI18next } from "react-i18next";


function SubmitIdeaNew(smallStats) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('')
  const [title, setTitle] = useState('')
  const [ideaStage, setIdeaStage] = useState(0)
  const [category, setCategory] = useState('')
  const [canGoNext, setCanGoNext] = useState(false)
  const [canContinue, setCanContinue] = useState(false)
  const [canSubmit, setCanSubmit] = useState(false)
  const [finishedSaving, setFinishedSaving] = useState(false)
  let currUser = Parse.User.current();
  // this.getUserName()

  const getUserName = async (user) => {
    var query = new Parse.Query(Parse.User);
    query.equalTo("objectId", user.id);
    const results = await query.find();
    const firstName = results[0].get('firstName');
    const lastName = results[0].get('lastName');
    const fullName = firstName + ' ' + lastName;
    const email = results[0].get("username")
    console.log(email)
    
    // return firstName
    setUsername(firstName)
    if (ideaStage == 0) {
      setTitle('Welcome back, ' + username+ '!')
    }
  }

  useEffect(() => {
    // Update the document title using the browser API
    getUserName(currUser)
  });

  const changeIdeaStage = (hasQuestions) => {
    const newStage = ideaStage + 1
    
    if (newStage == 0) {
      setTitle('Welcome back, ' + username+ '!')
      setIdeaStage(newStage)
    } else if (newStage == 1) {
      setTitle('Idea > Select Idea Type')
      setIdeaStage(newStage)
    } else if (newStage == 2) {
      setTitle('Idea > Innovation > Idea Details')
      setIdeaStage(newStage)
    } else if (newStage == 3) {
      setTitle('Idea > Innovation > Idea Details > Done')
      setCanSubmit(true)
    } else {
      setTitle('Welcome back, ' + username+ '!')
      window.location.reload();
      setIdeaStage(0)
    }
  }

  const setFinished = () => {
    setIdeaStage(3)
  }

  const changeBtnStatus = (status) => {
   console.log(status)
   setCanGoNext(status)
  }

  const changeContinueBtnStatus = (status) => {
   console.log(status)
   setCanContinue(status)
  }

  const processJson = (result) => {
      
    var object = OldIdeas;
    var allObjects = [];
    
    // alert(object.length)
    for (var i = 0; i < object.length; i++){
       var parseObject = createParseObjectFromJSONObject(object[i]);
       allObjects.push(parseObject);
    }
    
    // outside the loop we are ready to save all the objects in 
    // allObjects array in one service call!
    if (allObjects.length > 0){
      
        Parse.Object.saveAll(allObjects).then(function(){
          alert("all objects were saved!");
          // all object ids are now available under the allObjects array..
        },function(error){
            console.log("error: " + error);
        });   
    }

  }

  const  createParseObjectFromJSONObject = (jsonObject) => {

    var Idea = Parse.Object.extend("Idea");
    // Create a new instance of that class.
    var ideaInfo = new Idea();
    var currentUser = Parse.User.current();
    ideaInfo.set("proponentObj", currentUser);
    ideaInfo.set("proponent", jsonObject.proponent);
    ideaInfo.set("edited", jsonObject.edited?jsonObject.edited:false);
    ideaInfo.set("completed", jsonObject.completed?jsonObject.completed:false);
    ideaInfo.set("department", jsonObject.department);
    ideaInfo.set("category", jsonObject.category);
    ideaInfo.set("date", new Date());
    ideaInfo.set("num", 0);
    ideaInfo.set("title", jsonObject.title)
    ideaInfo.set("description", jsonObject.description);
    ideaInfo.set("status", jsonObject.status);
    ideaInfo.set("progress", jsonObject.progress?jsonObject.progress:[]);
    ideaInfo.set("filterAnswer", jsonObject.filterAnswer?jsonObject.filterAnswer:[]);
    ideaInfo.set("questionAnswer", jsonObject.questionAnswer?jsonObject.questionAnswer:[]);
    ideaInfo.set("proponentName", jsonObject.proponentName);
    ideaInfo.set("comments", jsonObject.comments?jsonObject.comments:[]);
    ideaInfo.set("needsEvaluation", jsonObject.needsEvaluation?jsonObject.needsEvaluation:false);
    ideaInfo.set("hasTeam", jsonObject.hasTeam?jsonObject.hasTeam:false);
    ideaInfo.set("ideaType", jsonObject.ideaType);
    ideaInfo.set("expectedReturn", jsonObject.expectedReturn?jsonObject.expectedReturn:0);
    
    return ideaInfo;
  }

  return (
  <Container fluid className="main-content-container px-4" style={{backgroundColor: 'white'}}>
    <Row>
      {/* Page Header :: Title */}
      <Col md="10" lg="10" className="mt-4 mx-auto">
        {/* <PageTitle title={t('Welcome back, Angel')} subtitle=" " className="text-sm-left" /> */}
        <Row>
          <Col md="8" lg="8">
            <h3 className="m-auto" style={{fontWeight: 600, color: '#303030'}}>{title}</h3>
          </Col>
          
          <Col xs="12" md="2" lg="2" className="col d-flex align-items-center ml-auto">
            {/* <ButtonGroup size="sm" className="d-inline-flex mb-3 mb-sm-0 mx-auto">
              <Button theme="white" onClick={() => processJson()}>
                {'import ideas'}
              </Button>
              <Button theme="white" tag={NavLink} to="/search-idea">
                {t('SEARCH')}
              </Button>
            </ButtonGroup> */}
            <div>
              <h6 className="m-0" style={{color: '#303030'}}>Idea # </h6>
            </div>
            <h4 className="m-0" style={{fontWeight: 600, color: '#303030'}}>{uuidv4().substring(0,4)}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <DivisorBarIcon></DivisorBarIcon>
          </Col>
        </Row>
      </Col>
      {/* Page Header :: Actions */}
      
    </Row>
    
    {/* Divider */}
    {/* <Col xs="12" md="12" style={{height: 1, width: '100%', backgroundColor: 'black', opacity: 0.2}} className="col d-flex align-items-center"></Col> */}

    <Row>
      {/* Latest Orders */}
      <Col lg="10" className="m-auto">
        <SubmitIdeaForm canSubmit={canSubmit} setFinishedSaving={() => setFinished()} finishedSaving={finishedSaving} currentStage={ideaStage} changeStatus={(status) => changeBtnStatus(status)} changeContinueStatus={(status) => changeContinueBtnStatus(status)} changeIdeaStage={() => changeIdeaStage()}/>     
      </Col>
    </Row>
    <Row>
      <Col lg="12" className="mb-2 ml-auto">

        {/* Submit Icon States */}
        {ideaStage == 0 && canGoNext && <SubmitIcon className="functionalButton ml-auto d-block" style={{minWidth: 140, maxWidth:140}} onClick={() => changeIdeaStage()}></SubmitIcon>}
        {ideaStage == 0 && !canGoNext && <SubmitIconNosel className="functionalButton ml-auto d-block" style={{minWidth: 140, maxWidth:140}} ></SubmitIconNosel>}
        

        {ideaStage > 0 && ideaStage <= 2 && canContinue &&  <NextIconValid className="functionalButton ml-auto d-block mb-4" style={{minWidth: 140, maxWidth:140}} onClick={() => changeIdeaStage()}></NextIconValid>}
        {ideaStage > 0 && ideaStage <= 2 && !canContinue && <NextIcon className="functionalButton ml-auto d-block mb-4" style={{minWidth: 140, maxWidth:140}} ></NextIcon>}
        
        {ideaStage == 3  && <HomeIcon className="functionalButton ml-auto d-block mb-4" style={{minWidth: 90, maxWidth:90}} onClick={() => changeIdeaStage()}></HomeIcon>}
      </Col>
    </Row>
    
  </Container>
  )}

SubmitIdeaNew.propTypes = {
  /**
   * The small stats data.
   */
  smallStats: PropTypes.array
};

SubmitIdeaNew.defaultProps = {
  signedIn: true,
  smallStats: [
    {
      label: "Ideas Submitted",
      value: "18",
      percentage: "12.4%",
      increase: true,
      chartLabels: [null, null, null, null, null],
      decrease: false,
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: colors.primary.toRGBA(0.1),
          borderColor: colors.primary.toRGBA(),
          data: [9, 3, 3, 9, 9]
        }
      ]
    },
    {
      label: "Ideas Accepted",
      value: "7",
      percentage: "7.21%",
      increase: false,
      chartLabels: [null, null, null, null, null],
      decrease: true,
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: colors.success.toRGBA(0.1),
          borderColor: colors.success.toRGBA(),
          data: [3.9, 4, 4, 9, 4]
        }
      ]
    },
    {
      label: "Ideas in Progress",
      value: "4",
      percentage: "3.71%",
      increase: true,
      chartLabels: [null, null, null, null, null],
      decrease: false,
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: colors.warning.toRGBA(0.1),
          borderColor: colors.warning.toRGBA(),
          data: [6, 6, 9, 3, 3]
        }
      ]
    },
  ]
};

export default SubmitIdeaNew;
