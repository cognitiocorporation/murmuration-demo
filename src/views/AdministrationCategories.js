import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col, Button, ButtonGroup } from "shards-react";
import { NavLink } from "react-router-dom";
import Parse from 'parse';

import PageTitle from "../components/common/PageTitle";
import EditCategoryForm from "../components/common/EditCategoryForm";
import { v4 as uuidv4 } from 'uuid';

import colors from "../utils/colors";

import { ReactComponent as SubmitIcon} from "../images/submit_new_new.svg"
import { ReactComponent as SubmitIconNosel } from "../images/submit_new_nosel.svg"
import { ReactComponent as NextIcon } from "../images/NextIcon.svg"
import { ReactComponent as NextIconValid } from "../images/NextIconSelected.svg"
import { ReactComponent as DivisorBarIcon } from "../images/edited_divisor.svg"
import { ReactComponent as HomeIcon } from "../images/home.svg"
import { ReactComponent as GreenIcon } from "../images/green_icon.svg"
import { ReactComponent as ArrowDownIcon } from "../images/arrow_down.svg"
import { ReactComponent as ArrowUpIcon } from "../images/arrow_up.svg"
import { ReactComponent as AddCategoryIcon } from "../images/add_category.svg"



import { useTranslation, initReactI18next } from "react-i18next";


function AdministrationCategories(smallStats) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('')
  const [title, setTitle] = useState('')
  const [ideaStage, setIdeaStage] = useState(1)
  const [category, setCategory] = useState('')
  const [canGoNext, setCanGoNext] = useState(false)
  const [canContinue, setCanContinue] = useState(false)
  const [canSubmit, setCanSubmit] = useState(false)
  const [finishedSaving, setFinishedSaving] = useState(false)
  const [categoryIsOpen, setCategoryIsOpen] = useState(false)
  let currUser = Parse.User.current();
  // this.getUserName()

  const setInitialTitle = async (user) => {
    
    // return firstName
   
    setTitle('Administration > Categories')

  }

  useEffect(() => {
    // Update the document title using the browser API
    setInitialTitle()
  });

  const changeIdeaStage = () => {
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
              <Button theme="white" tag={NavLink} to="/submit-idea">
                {t('SUBMIT')}
              </Button>
              <Button theme="white" tag={NavLink} to="/search-idea">
                {t('SEARCH')}
              </Button>
            </ButtonGroup> */}
           
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
              <div style={{width: '100%', borderStyle: 'solid',borderColor: 'black', borderWidth: 2, borderRadius: 5, marginBottom: 5, display: 'flex'}}>
                <GreenIcon className="ml-4 my-auto" style={{height: 16, width: 16, display: 'inline-block'}}></GreenIcon>
                <div className="ml-4 my-auto" style={{height: '100%', display: 'inline-block'}}>
                    <h6 className="my-auto" style={{fontWeight: 500,  color: '#303030',}}>{"Category Name"}</h6>
                </div>

                { categoryIsOpen && <ArrowUpIcon onClick={() => setCategoryIsOpen(false)} className="mr-2 ml-auto my-auto" style={{height: 16, width: 16, display: 'inline-block'}}></ArrowUpIcon> }
                { !categoryIsOpen && <ArrowDownIcon onClick={() => setCategoryIsOpen(true)} className="mr-2 ml-auto my-auto" style={{height: 16, width: 16, display: 'inline-block'}}></ArrowDownIcon>}
              
              </div>
              { categoryIsOpen &&
              <div style={{backgroundColor: '#F6F6F6',}}>
               <EditCategoryForm canSubmit={canSubmit} setFinishedSaving={() => setFinished()} ideaStage={ideaStage} changeStatus={(status) => changeBtnStatus(status)} changeContinueStatus={(status) => changeContinueBtnStatus(status)} changeIdeaStage={() => this.changeIdeaStage()}/>
              </div>
              }
      </Col>
    </Row>
    <Row className="mt-4">
      <Col lg="10" className="m-auto">
       
        <AddCategoryIcon className="mr-4 d-block mb-4" style={{minWidth: 180, maxWidth:180}} onClick={() => console.log('New Category')}></AddCategoryIcon>
       
        {/* {ideaStage == 0 && canGoNext && <SubmitIcon className="ml-auto d-block" style={{minWidth: 140, maxWidth:140}} onClick={() => changeIdeaStage()}></SubmitIcon>}
        {ideaStage == 0 && !canGoNext && <SubmitIconNosel className="ml-auto d-block" style={{minWidth: 140, maxWidth:140}} ></SubmitIconNosel>}
        

        {ideaStage > 0 && ideaStage <= 2 && canContinue &&  <NextIconValid className="ml-auto d-block mb-4" style={{minWidth: 140, maxWidth:140}} onClick={() => changeIdeaStage()}></NextIconValid>}
        {ideaStage > 0 && ideaStage <= 2 && !canContinue && <NextIcon className="ml-auto d-block mb-4" style={{minWidth: 140, maxWidth:140}} ></NextIcon>}
        
        {ideaStage == 3  && <HomeIcon className="ml-auto d-block mb-4" style={{minWidth: 90, maxWidth:90}} onClick={() => changeIdeaStage()}></HomeIcon>} */}
      </Col>
    </Row>
    
  </Container>
  )}

AdministrationCategories.propTypes = {
  /**
   * The small stats data.
   */
  smallStats: PropTypes.array
};

AdministrationCategories.defaultProps = {
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

export default AdministrationCategories;
