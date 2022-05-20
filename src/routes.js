import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, HeaderNavigation, IconSidebar } from "./layouts";

// Route Views
import Analytics from "./views/Analytics";
import SubmitIdea from "./views/SubmitIdea"
import SubmitIdeaNew from "./views/SubmitIdeaNew"
import SearchIdea from "./views/SearchIdea"
import OnlineStore from "./views/OnlineStore";
import BlogOverview from "./views/BlogOverview";
import UserProfile from "./views/UserProfile";
import UserProfileLite from "./views/UserProfileLite";
import EditUserProfile from "./views/EditUserProfile";
import Login from "./views/Login";
import Register from "./views/Register";
import ForgotPassword from "./views/ForgotPassword";
import ChangePassword from "./views/ChangePassword";
import FileManagerList from "./views/FileManagerList";
import FileManagerCards from "./views/FileManagerCards";
import TransactionHistory from "./views/TransactionHistory";
import IdeaVerificationInbox from "./views/IdeaVerificationHistory";
import VerificationHistory from "./views/VerificationHistory";
import RecognitionHistory from "./views/RecognitionHistory";
import Calendar from "./views/Calendar";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import HeaderNav from "./views/HeaderNavigation";
import IconSidebarView from "./views/IconSidebar";
import Administration from "./views/Administration";
import AdministrationUsers from "./views/AdministrationUsers";
import AdministrationUsersNew from "./views/AdministrationUsersNew";
import AdministrationQuestions from "./views/AdministrationQuestions";
import AdministrationComite from "./views/AdministrationComite";
import AdministrationCatsDepts from "./views/AdministrationCatsDepts";
import AdministrationCategories from "./views/AdministrationCategories";
import AdministrationDepartments from "./views/AdministrationDepartments";
import AdministrationPreguntas from "./views/AdministrationPreguntas";
import RecognitionInbox from "./views/RecognitionInbox";
import EvaluateIdea from "./views/EvaluateIdea";

const BlankIconSidebarLayout = ({ children }) => (
  <IconSidebar noNavbar noFooter>
    {children}
  </IconSidebar>
);

// const PrivateRoute = ({component: Component, ...rest}) => (

// )

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    protected: true,
    component: () => <Redirect to="/submit-idea-new" />
  },//<Redirect to="/administration-questions" />
  {
    path: "/analytics",
    layout: DefaultLayout,
    protected: true,
    component: Analytics
  },
  {
    path: "/administracion",
    layout: DefaultLayout,
    protected: true,
    component: Administration
  },
  {
    path: "/administracion-user",
    layout: DefaultLayout,
    protected: true,
    component: AdministrationUsers
  },
  {
    path: "/administration-users",
    layout: DefaultLayout,
    protected: true,
    component: AdministrationUsersNew
  },
  {
    path: "/administration-questions",
    layout: DefaultLayout,
    protected: true,
    component: AdministrationQuestions
  },
  {
    path: "/administracion-comite",
    layout: DefaultLayout,
    protected: true,
    component: AdministrationComite
  },
  {
    path: "/administracion-preguntas",
    layout: DefaultLayout,
    protected: true,
    component: AdministrationPreguntas
  },
  {
    path: "/administracion-departamentos-comites",
    layout: DefaultLayout,
    protected: true,
    component: AdministrationCatsDepts
  },
  {
    path: "/administration-categories",
    layout: DefaultLayout,
    protected: true,
    component: AdministrationCategories
  },
  {
    path: "/administration-departments",
    layout: DefaultLayout,
    protected: true,
    component: AdministrationDepartments
  },
  {
    path: "/submit-idea",
    layout: DefaultLayout,
    protected: true,
    component: SubmitIdea,
  },
  {
    path: "/submit-idea-new",
    layout: DefaultLayout,
    protected: true,
    component: SubmitIdeaNew,
  },
  {
    path: "/search-idea",
    layout: DefaultLayout,
    protected: true,
    component: SearchIdea
  },
  {
    path: "/idea-management",
    layout: DefaultLayout,
    protected: true,
    component: OnlineStore
  },
  {
    path: "/idea-management-2",
    layout: DefaultLayout,
    protected: true,
    component: EvaluateIdea
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile",
    layout: DefaultLayout,
    component: UserProfile
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/edit-user-profile",
    layout: DefaultLayout,
    component: EditUserProfile
  },
  {
    path: "/login",
    layout: BlankIconSidebarLayout,
    protected: false,
    component: Login
  },
  {
    path: "/register",
    layout: BlankIconSidebarLayout,
    component: Register
  },
  {
    path: "/forgot-password",
    layout: BlankIconSidebarLayout,
    component: ForgotPassword
  },
  {
    path: "/change-password",
    layout: BlankIconSidebarLayout,
    component: ChangePassword
  },
  {
    path: "/file-manager-list",
    layout: DefaultLayout,
    component: FileManagerList
  },
  {
    path: "/file-manager-cards",
    layout: DefaultLayout,
    component: FileManagerCards
  },
  {
    path: "/historial",
    layout: DefaultLayout,
    component: TransactionHistory,
    protected: true,
  },
  {
    path: "/historial-verificacion",
    layout: DefaultLayout,
    component: VerificationHistory,
    protected: true,
  },
  {
    path: "/entradas-verificacion",
    layout: DefaultLayout,
    component: IdeaVerificationInbox,
    protected: true,
  },
  {
    path: "/entradas-reconocimiento",
    layout: DefaultLayout,
    component: RecognitionInbox,
    protected: true,
  },
  {
    path: "/historial-reconocimiento",
    layout: DefaultLayout,
    component: RecognitionHistory,
    protected: true,
  },
  {
    path: "/calendar",
    layout: DefaultLayout,
    component: Calendar
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path: "/header-navigation",
    layout: HeaderNavigation,
    component: HeaderNav
  },
  {
    path: "/icon-sidebar-nav",
    layout: IconSidebar,
    component: IconSidebarView
  }
];