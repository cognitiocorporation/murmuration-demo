import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col, Button, ButtonGroup } from "shards-react";
import { NavLink } from "react-router-dom";
import Parse from 'parse';

import EditCategoryForm from '../common/EditCategoryForm';
import EditDepartmentForm from '../common/EditDepartmentForm';
import EditUserForm from '../common/EditUserForm';
import { v4 as uuidv4 } from 'uuid';

import colors from "../../utils/colors";

import SmallSwitch from '../common/SmallSwitch';


import { ReactComponent as GreenIcon } from "../../images/green_icon.svg"
import { ReactComponent as RedIcon } from "../../images/red_icon.svg"
import { ReactComponent as ArrowDownIcon } from "../../images/arrow_down.svg"
import { ReactComponent as ArrowUpIcon } from "../../images/arrow_up.svg"




import { useTranslation, initReactI18next } from "react-i18next";


function NewUserItem({user, updateUsers, open, canEdit}) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('')
  const [title, setTitle] = useState('')
  const [ideaStage, setIdeaStage] = useState(1)
//   const [category, setCategory] = useState('')
  const [canGoNext, setCanGoNext] = useState(false)
  const [canContinue, setCanContinue] = useState(false)
  const [canSubmit, setCanSubmit] = useState(false)
  const [finishedSaving, setFinishedSaving] = useState(false)
  const [categoryIsOpen, setCategoryIsOpen] = useState(open)
  const [selectedUser, setSelectedUser] = useState(user)
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

  

  const categoryNameEnglish = "User Name"
  const categoryNameSpanish = "Nombre de Usuario"
  const categoryStatus = true

  return (
    <Row>
      {/* Latest Orders */}
      <Col lg="10" className="m-auto">
              <div style={{width: '100%', borderStyle: 'solid',borderColor: 'black', borderWidth: 2, borderRadius: 5, marginBottom: 5, display: 'flex'}}>

                {/* Change Status Color of Category */}
                {/* {categoryStatus && <GreenIcon className="ml-4 my-auto" style={{height: 16, width: 16, display: 'inline-block'}}></GreenIcon>}
                {!categoryStatus && <RedIcon className="ml-4 my-auto" style={{height: 16, width: 16, display: 'inline-block'}}></RedIcon>} */}
                

                <div className="ml-4 my-auto" style={{height: '100%', display: 'inline-block'}}>
                    <h6 className="my-auto" style={{fontWeight: 500,  color: '#303030',}}>{categoryNameEnglish}</h6>
                </div>

                { categoryIsOpen && <ArrowUpIcon onClick={() => setCategoryIsOpen(false)} className="mr-2 ml-auto my-auto" style={{height: 16, width: 16, display: 'inline-block'}}></ArrowUpIcon> }
                { !categoryIsOpen && <ArrowDownIcon onClick={() => setCategoryIsOpen(true)} className="mr-2 ml-auto my-auto" style={{height: 16, width: 16, display: 'inline-block'}}></ArrowDownIcon>}
              
              </div>
              { categoryIsOpen &&
              <div style={{backgroundColor: '#F6F6F6',}}>
               <EditUserForm canEdit={canEdit} refreshUsers={updateUsers} userData={user} canSubmit={canSubmit} setFinishedSaving={() => setFinished()} ideaStage={ideaStage} changeStatus={(status) => changeBtnStatus(status)} changeContinueStatus={(status) => changeContinueBtnStatus(status)} changeIdeaStage={() => this.changeIdeaStage()}/>
              </div>
              }
      </Col>
    </Row>
  )}

NewUserItem.propTypes = {
  /**
   * The small stats data.
   */
  smallStats: PropTypes.array
};

NewUserItem.defaultProps = {
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

export default NewUserItem;
