import React, { useState, useEffect, createContext } from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col, Button, ButtonGroup } from "shards-react";
import { NavLink } from "react-router-dom";
import Parse from 'parse';

import PageTitle from "../components/common/PageTitle";
import EditCategoryForm from "../components/common/EditCategoryForm";
import CategoryItem from '../components/administration/CategoryItem';
import NewUserItem from '../components/administration/NewUserItem';
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
import { ReactComponent as AddUserIcon } from "../images/add_user.svg"



import { useTranslation, initReactI18next } from "react-i18next";
import UserListNew from '../components/ecommerce/UserListNew';


function AdministrationUsersNew(smallStats) {
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
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState([])
  const [showUser, setShowUser] = useState(false)
  const [shouldUpdateUsers, setShouldUpdateUsers] = useState(false)
  const [user, setUser] = useState('')
  const [canEdit, setCanEdit] = useState(false)
  let currUser = Parse.User.current();
  // this.getUserName()

  const setInitialTitle = async (user) => {
    
    // return firstName
   
    setTitle('Administration > Users')

  }

  useEffect(() => {
    // Update the document title using the browser API
    setInitialTitle()
    getCategories()
  }, []);

  const getCategories = async() => {
    const Category = Parse.Object.extend("IdeaCategory");
    const query = new Parse.Query(Category);
    const results = await query.find();
    
    setCategories(results)
  }

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

  const updateCategories = () => {
    // alert('Update Categories') 
    setShouldUpdateUsers(!shouldUpdateUsers)
    setShowUser(false)
    setUser('')
  }

  // const createUser = () => {
  //   const IdeaCategory = Parse.Object.extend("IdeaCategory");
  //   const ideaCategory = new IdeaCategory();

  //   ideaCategory.set("itemNameTrans", {en: "New Category", es: "Nueva Categoria"});
  //   ideaCategory.set("extra", true);
  //   ideaCategory.set("icon", "");
  //   ideaCategory.set("show", false);
  //   ideaCategory.set("itemName", 'newCategory'+Math.random())
  //   ideaCategory.set("categoryDescription", {"en": "Category 7 description goes here.","es": "Descripción 7 de categoria va aquí."})

  //   ideaCategory.save()
  //   .then((ideaCategory) => {
  //     // Execute any logic that should take place after the object is saved.
  //     setNewCategory([ideaCategory])
  //   }, (error) => {
  //     // Execute any logic that should take place if the save fails.
  //     // error is a Parse.Error with an error code and message.
  //     console.log(error.message)
  //     alert('Error creating new category.')
  //   });
    
  //   setCategories()
  // }

  const createUser = () => {
    setShowUser(true)
  }

  const editItem = (item) => {
    // alert('edit me')
    console.log(item)
    setUser(item)
    setCanEdit(true)
    setShowUser(true)
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

    {/* Categories */}

    
    
    

    
    <Row className="mt-4">
      <Col lg="10" className="m-auto">
       
        <AddUserIcon className="functionalButton mr-4 d-block mb-4" style={{minWidth: 180, maxWidth:180}} onClick={() => createUser()}></AddUserIcon>
       
        {/* {ideaStage == 0 && canGoNext && <SubmitIcon className="ml-auto d-block" style={{minWidth: 140, maxWidth:140}} onClick={() => changeIdeaStage()}></SubmitIcon>}
        {ideaStage == 0 && !canGoNext && <SubmitIconNosel className="ml-auto d-block" style={{minWidth: 140, maxWidth:140}} ></SubmitIconNosel>}
        

        {ideaStage > 0 && ideaStage <= 2 && canContinue &&  <NextIconValid className="ml-auto d-block mb-4" style={{minWidth: 140, maxWidth:140}} onClick={() => changeIdeaStage()}></NextIconValid>}
        {ideaStage > 0 && ideaStage <= 2 && !canContinue && <NextIcon className="ml-auto d-block mb-4" style={{minWidth: 140, maxWidth:140}} ></NextIcon>}
        
        {ideaStage == 3  && <HomeIcon className="ml-auto d-block mb-4" style={{minWidth: 90, maxWidth:90}} onClick={() => changeIdeaStage()}></HomeIcon>} */}
      </Col>
    </Row>

    <Row className="mt-2">
        <Col md="12" lg="12">
          <NewUserItem key={Math.random()} id={Math.random()}  open={showUser} updateUsers={updateCategories} user={user} canEdit={canEdit}></NewUserItem>
        </Col>
    </Row>

    <Row className="mt-2">
        <Col lg="10" className="m-auto">
            <div style={{backgroundColor: '#F6F6F6', height: 500, overflow: 'scroll', borderStyle: 'solid', borderColor: 'black', borderWidth: 2, borderRadius: 5, marginBottom: 100}}>
                <UserListNew shouldUpdate={shouldUpdateUsers} editItem={(user) => editItem(user)}/>
            </div>
        </Col>
    </Row>
    
  </Container>
  )}

AdministrationUsersNew.propTypes = {
  /**
   * The small stats data.
   */
  smallStats: PropTypes.array
};

AdministrationUsersNew.defaultProps = {
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

export default AdministrationUsersNew;
