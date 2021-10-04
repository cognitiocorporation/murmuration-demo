import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// i18n
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';


import * as serviceWorker from './serviceWorker';

const allowedLanguages = ['en', 'es'];
const storageLanguage = localStorage.getItem('language');

if (!storageLanguage) {
  localStorage.setItem('language', 'es');
}

const defaultLng = 'es';
let lng = defaultLng;

if (storageLanguage && allowedLanguages.indexOf(storageLanguage) > -1) {
  lng = storageLanguage;
}


console.log(lng)
i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    react: {
        useSuspense: false,
    },
    resources: {
      en: {

        translation: {
    
          "IDEA": "IDEA",

          "BACK": "Back",
    
          "SUBMIT_IDEA": "Submit Idea",
    
          "SUBMIT_IDEA_Sub": "Submit IDEA information and details",

          "IDEA_INFO": "IDEA Info",
    
          "SUBMIT_IDEA_Proponent": "Proponent",
    
          "SUBMIT_IDEA_Department": "Department",

          "SUBMIT_IDEA_Department_Benefitted": "Impacted Department",
    
          "SUBMIT_IDEA_DepartmentSelect": "Select a department",
    
          "SUBMIT_IDEA_SELECT": "Select a department",
    
          "SUBMIT_IDEA_Date": "Date",
    
          "SUBMIT_IDEA_Team": "Team",

          "CHOOSE_FILE":"Choose a file...",

          "RESET_PASSWORD":"Reset password",

          "LOGOUT":"Logout",

          "IDEA_COMPLETADA": "IMPLEMENTED IDEA", 

          "IDEA_COMPLETADA_MESSAGE": "Add your IDEA implementation results.",

          "TITLE":"Title",

          "DESCRIPTION":"Description",

          "FILE":"File",

          "VIEW_FILE":"View File",

          "EVALUATION":"Evaluation",

          "COMMENTS":"Comments",

          "RESPONSABILITY":"Responsability",

          "WRITE_COMMENTS":"Write comments",

          "ASSIGN_RESPONSIBLE_EXECUTION":"Assign responsible for execution",

          "ASSIGN_COACH":"Assign a coach",

          "PHOTOS_BEFORE_AFTER":"Photos (Before and After)",

          "SUBMIT_BEFORE_AFTER": "Submit before and after picture.",

          "MEJORAS_IMPLANTADAS": "Implementations",

          "RESULTS": "Results",

          "BEFORE": "Before",

          "AFTER": "After",

          "NO_FILE_FOUND": "No file found.",

          "RESPONSIBLE_NAME":"Responsible Name",

          "CATEGORY_INFORMATION":"Category Information",

          "BASIC_INFORMATION":"Basic Information",

          "IDEA_INNOVATION":"Is this an innovation idea?",
    
          "IDEA_PROBLEM":"Does this idea solve a problem?",
    
          "SUBMIT_IDEA_TeamPlaceholder": "Team Name",
    
          "SUBMIT_IDEA_Category": "Category",
    
          "SUBMIT_IDEA_IdeaTitle": "Idea Title",
    
          "SUBMIT_IDEA_TitlePlaceholder": "Short title...",
    
          "SAFETY_CATEGORY":"Safety",
    
          "QUALITY_CATEGORY":"Quality",
    
          "IMMEDIATEACTION_CATEGORY":"Immediate Action",
    
          "PRODUCTIVITY_CATEGORY":"Productivity",
    
          "SUBMIT_IDEA_IdeaDescription": "Idea Description",
    
          "SUBMIT_IDEA_DescriptionPlaceholder": "Description...",
    
          "SUBMIT_IDEA_UploadArchive": "Upload Archive",
    
          "SUBMIT_IDEA_RemainingCharacters": "remaining characters.",
    
          "SUBMIT_IDEA_REQUIRED_QUESTION": "*This question is required",
    
          "TEAM":"Team",
    
          "ANSWER":"Answer...",
    
          "SUBMIT":"Submit",
    
          "SEARCH":"Search",
    
          "CONTINUE":"Continue",
    
         "ENTRIES":"Entries",
    
          "HISTORY":"History",
    
          // Administration
    
          "ADMINISTRATION_TITLE": "ADMINISTRATION",
    
          "ADMINISTRATION_SUBTITLE": "CONFIGURATION AND",

          // EVALUATION
          "EVAL_IDEA_TITLE":"Evaluate IDEA",

          "EVAL_IDEA_TITLE_PROJECT":"Evaluate PROJECT",

          "EVAL_IDEA_VERIFICATION":"Verification",

          "EVAL_IDEA_BENEFITS":"Were goals met?",

          "EVAL_IDEA_IMPROVEMENT":"Did the IDEA improve the process or process stage?",

          "EVAL_IDEA_FINRES":"Financial result",

          "EVAL_IDEA_IMPACT":"Were other areas of the process impacted or replicated?",

          "EVAL_IDEA_RECOG":"Does this IDEA get recognition?",

          "EVAL_IDEA_YES":"Yes",

          "EVAL_IDEA_NO":"No",

          "EVAL_IDEA_BUTTON":"Submit Verification",

           // RECOGNITION
           "RECOG_IDEA_TITLE":"Create Recognition",

           "RECOG_IDEA_RECOGNITION":"Recognition",
 
           "RECOG_IDEA_EMPLOYEES":"Recognize Employees",

           "RECOG_IDEA_DATE":"Recognition Date",

           "RECOG_IDEA_TYPE":"Type of Recognition",

           "RECOG_IDEA_POINTS":"Reward",

           "RECOG_IDEA_LOW":"Low",
           "RECOG_IDEA_MODERATE":"Moderate",
           "RECOG_IDEA_HIGH":"High",
    
          // Evaluation committee
    
          "EVAL_COMMITTEE_NEW": "New Evaluation Committee",
    
          "EVAL_COMMITTEE": "Evaluation Committee",
    
          "EVAL_COMMITTEE_PLACEHOLDER": "Evaluation committee name",
    
          "EVAL_COMMITTEE_MEMBER": "Members",
    
          "EVAL_COMMITTEE_EMAIL_PLACEHOLDER": "Email",
    
          "EVAL_COMMITTEE_NAME_PLACEHOLDER": "Full name",
    
          "EVAL_COMMITTEE_MEMBER_BTN": "Add members",
    
          "EVAL_COMMITTEE_TYPE_TITLE": "This committee will evaluate by: ",
    
          "EVAL_COMMITTEE_AREA": "Area of Responsibility",
    
          "EVAL_COMMITTEE_CLASSIFICATION": "Idea Classification",
    
          "EVAL_COMMITTEE_CREATE_BTN": "Create Committee",
    
          "EVAL_COMMITTEE_DEPARTMENT": "Department",
    
          "EVAL_COMMITTEE_CATEGORY": "Category",
    
          "EVAL_COMMITTEES": "Evaluation Committees",
    
          "CATEGORIES": "CATEGORIES",
    
          "DEPARTMENTS": "DEPARTMENTS",
    
          "NEW_QUESTION": "New Question",
    
          "QUESTION_ENGLISH": "Question (English)",
    
          "QUESTION_SPANISH": "Question (Spanish)",

          "QUESTION_OPEN": "Open Ended Question (Field)",
    
          "QUESTION_PLACEHOLDER": "Write your question here...",

          "QUESTION_PLACEHOLDER_SPANISH": "Write your question in spanish here...",
    
          "QUESTION_CATEGORY": "Category",
    
          "QUESTION_REQUIRED": "Required Question",
    
          "QUESTION_BTN": "Submit Question",
    
          "QUESTION_LIST": "Question List",
    
          "QUESTION": "Question",
    
          "CATEGORY": "Category",
    
          "STATUS": "Status",
    
          "ACTIONS": "Actions",
    
          "SELECT_MEMBERS":"Select Members",
          "SHOW":"SHOW",
          "ROWS":"ROWS",
    
          //Idea Filter Select
    
          "IDEA_FILTER_INNOVATION":"Is this an innovation idea?",
    
          "IDEA_FILTER_QUESTION":"Does this idea solve a problem?",
    
          //SEARCH IDEA
    
          "IDEA_UPDATE_TITLE":"Update Idea",
    
          "IDEA_UPDATE_SUBTITLE":"IDEA",
    
          "IDEA_UPDATE_NUM":"Idea number",
    
          "IDEA_UPDATE_TIT":"Title",
    
          "IDEA_UPDATE_CAT":"Category",
    
          "IDEA_UPDATE_PROG":"Progress",
    
          "IDEA_UPDATE_STATUS":"Status",
    
          "IDEA_UPDATE_VIEW":"View / Edit",
    
          // MANAGE IDEA
    
          "IDEA_MANAGE_TITLE":"Manage Idea",
    
          "IDEA_MANAGE_SUBTITLE":"IDEA",
    
          "IDEA_MANAGE_OVERVIEW":"Idea Overview",
    
          "IDEA_MANAGE_PROPONENT":"Proponent",
    
          "IDEA_MANAGE_SUBMITTED":"Submitted",
    
          "IDEA_MANAGE_DEPARTMENT":"Department",
    
          "IDEA_MANAGE_CATEGORY":"Category",
    
          "IDEA_MANAGE_ASSIGNED":"Assigned to",

          "IDEA_MANAGE_COACH":"Coach",
    
          "IDEA_MANAGE_STATUS":"Current Status",
    
          "IDEA_MANAGE_PROGRESS":"Current Progress",
    
         "IDEA_MANAGE_ADD_PROGRESS":"Update Progress",

         "IDEA_EVALUATED_ASSIGNED":"Idea was evaluated and assigned",

         "IDEA_EXECUTION_STARTED":"Execution started",

         "IDEA_IMPLEMENTED":"Implemented",

         "IDEA_IMPLEMENTED_BENEFITS":"Implemented with benefits",

         "WRITE_NEW_COMMENT":"Write a New Comment",

         "WRITE_NEW_COMMENT_DESCRIPTION":"Write a new comment about the IDEA",

          "IDEA_MANAGE_BTN_HOLD":"Pause Idea",
    
          "IDEA_MANAGE_BTN_UPDATE":"Update Idea",
    
          // MENU
          "IDEA_VERIFICATION":"Verify Idea",

    
          "MENU_IDEA":"Idea",
    
          "MENU_SUBMIT_IDEA":"Submit Idea",
    
          "MENU_SEARCH_IDEA":"Search Idea",
    
          "MENU_MANAGE_IDEA":"Manage Ideas",
    
          "MENU_IDEA_VERIFICATION":"Idea Verification",
    
          "MENU_RECOGNITION":"Rewards & Recognition",
    
          "MENU_REPORTS":"Reports",
    
          "MENU_ADMINISTRATION":"Administration",
    
          "MENU_INCOMING_IDEAS":"Incoming Ideas",
    
          "MENU_INCOMING_RECOGNITION":"Incoming Recognition",
    
          "MENU_HISTORY":"History",

          "MENU_CATS_DEPTS": "Categories/Departments",

          "MENU_USERS": "Users",

          "MENU_COMITES": "Committees",

          "MENU_QUESTIONS": "Questions",

          "IMPORT_CATS_DEPTS": "Import Categories and Departments",

          "IMPORT_QUESTIONS": "Import Questions",
          "RESET_IDEAS":"Reset Ideas",
    
          // REPORTS
    
          "REPORTS": "Reports",
    
          "VIEW_REPORTS": "View Reports",
    
          "SUBMITTED_IDEAS": "Submitted Ideas",
    
          "COMPLETED_IDEAS": "Completed Ideas",
    
          "IDEAS_ON_PROGRESS": "Ideas on Progress",
    
          "PENDING_FOR_EVALUATION": "Pending for Evaluation",
    
          "IDEAS_BY_DEPARTMENT": "Ideas by Department",
    
          "PROGRESS_BY_CATEGORY": "Progress by Category",
          
          "EXPECTED_EARNINGS_BY_CATEGORY": "Expected Earnings by Category",

          "ACTUAL_EARNINGS_BY_CATEGORY": "Actual Earnings by Category",
    
          // CONFIGURATION AND ADMINISTRATION
    
          "CONFIGURATION_AND": "CONFIGURATION AND",
    
          "ADMINISTRATION": "ADMINISTRATION",
    
          "NEW_EVAL_COMMITTEE": "New Evaluation Committee",
    
          "EVAL_COMMITTEE_NAME": "Evaluation committee name",
    
          "EVAL_COMMITTEE_MEMBERS": "Members",
    
          "EVAL_COMMITTEE_EMAIL": "Email",
    
          "EVAL_COMMITTEE_NAME": "Full name",
    
          "EVAL_COMMITTEE_ADD_MEMBERS": "Add members",
          "EVAL_COMMITTEE_ADD":"Add new members",
    
          "EVAL_COMMITTEE_EVALUATE_BY": "This committee will evaluate by:",
    
          "EVAL_COMMITTEE_CREATE_COMMITTEE": "Create Committee",
    
          "EVAL_COMMITTEE_AREA_RESPONSIBILITY": "Area of Responsibility",
    
          "EVAL_COMMITTEE_IDEA_CLASSIFICATION": "Area of Responsibility",
    
          // MANAGE IDEA ENTRANTE
    
          "IDEA_MANAGE_FILTERS":"Filters",
    
          "IDEA_MANAGE_SUBTITLE":"IDEA",
    
          "IDEA_MANAGE_OPEN":"Open IDEA",
    
          "IDEA_MANAGE_NUM":"Idea Number",
    
          "IDEA_MANAGE_TITLE":"Title",
    
          "IDEA_MANAGE_CAT":"Category",
    
          "IDEA_MANAGE_CATS":"Categories",
    
          "IDEA_MANAGE_TYPES":"Idea Type",
    
          "IDEA_MANAGE_PROG":"Progress",
    
          "IDEA_MANAGE_PROP":"Proponent",
    
          "IDEA_MANAGE_STATUS":"Status",
    
          "IDEA_MANAGE_EVALUATE":"Evaluate",
    
          // HISTORY
    
          "TRANSACTION_HISTORY": "Transaction History",
    
          "TRANSACTION_DESCRIPTION": "Description",
    
          "TRANSACTION_CATEGORY": "Category",
    
          "TRANSACTION_PROPONENT":"Proponent",
    
          "TRANSACTION_STATUS": "Status",
    
          "TRANSACTION_ACTIONS":"Actions",
    
          "TRANSACTION_EVALUATED": "Evaluated Ideas",
    
          "TRANSACTION_MANAGE":"Idea Management",
    
          "TRANSACTION_VERIFIED":"Verified Ideas",
    
          "TRANSACTION_RECOGNITION":"RECOGNITIONS",
    
          "TRANSACTION_VIEWRECOGNITION":"VIEW RECOGNITION",
    
          "TRANSACTION_EMPLOYEE_NAME":"Employee Name",
    
          "TRANSACTION_EMPLOYEE_NUM":"Employee Number",
    
          "TRANSACTION_RECOGNITION_TYPE":"Type",
    
          "TRANSACTION_EMPLOYEE_POINTS":"Points",
    
          'NUMBER_MEMBERS':"Number of members:",
    
          'EVALUATING_BY':"Evaluating by: ",
    
          'ENGLISH':"English",
    
          'SPANISH':"Spanish",
    
          // EVALUATE
    
          "EVALUATE_IDEA":"Evaluate IDEA",
    
          "REVIEW_IDEA":"IDEA Review",
    
          "EVALUATION_IDEA":"Evaluation",
    
          "NEEDS_INFO_IDEA":"IDEA Needs More Information",

          "NEEDS_INFO_PROJECT":"Project Needs More Information",
    
          "HOLD_IDEA":"IDEA on Hold",

          "HOLD_PROJECT":"Project on Hold",
    
          "NOT_PURSUED_IDEA":"Not Pursued",

          "NOT_PURSUED_PROJECT":"Not Pursued",

          "ENTER_LAST_NAME":"Last Name",
    
          "JUST_DO_IDEA":"Just Do It",

          "JUST_DO_PROJECT":"Just Do It Project",
    
          "PROYECT_IDEA":"IDEA Project",
    
          "OTHER_COMMITTEE_IDEA":"Other Committee",
    
          "COMMENTS_IDEA":"Comments",
    
          "WRITE_COMMENTS_IDEA":"Write comments",
    
          "ASSIGN_RESPONSIBLE_IDEA":"Assign responsible for execution",
    
          "RESPONSIBLE_NAME_IDEA":"Responsible Name",
    
          "ASSIGN_COACH_IDEA":"Assign IDEA Coach",
    
          "RESET": "Reset",
    
          "RESET_MSG": "This will delete all ideas. Do you want to proceed?",

          "USER_LIST": "User List",

          "ENTER_NAME":"Name",

          "FIRST_NAME_PLACEHOLDER":"First Name",
    
          "LAST_NAME_PLACEHOLDER":"Last Name",

          "EMAIL":"Email",

          "USERID":"Userid",
          "USERID_PLACEHOLDER":"Enter your Userid",

          "EMAIL_PLACEHOLDER":"jose.feli@lasalle-group.com",

          "USER_TYPE":"Role",

          "ADD_USER_BTN": "Add User",

          "NEW_USER": "New User",

          // Reports
          "IDEAS_BY_PROGRESS":"Ideas by Status",
          "DOWNLOAD_DATA": "Download Data",

          // Filters
          "FILTER_INNOVATION": "Innovation",
          "FILTER_PROBLEM_F": "Problem",
          "FILTER_ALL": "All",
          "FILTER_SUBMITTED": "Submitted",
          "FILTER_DONE": "Done",

          // Return
          "SUBMIT_IDEA_ReturnTitle":"Expected Savings (Monthly)",
          "SUBMIT_IDEA_ReturnPlaceholder":"E.g. 1000",

          "DELETE_FILE": "Delete File",
          "HELP":"Help",
          "SUBMIT_IDEA_Money":"Only numbers are accepted. Please do not use commas or other invalid characters.",
          "COULD_BE_REPLICATED":"Could it be replicated in other ares or sites?",
          "SAVINGS_IN_LABOR":"Savings in labor (hrs)",
          "NUMBER_HOURS_SAVED":"Number of hours saved...",
          "COST":"Cost (USD)",
          "COST_SAVED":"How much money it saved...",
          "INVENTORY":"Inventory (USD)",
          "INVENTORY_DESC":"Inventory...",
          "OEE_INCREASE":"OEE (Increase %)",
          "OEE_INCREASE_MUCH":"By how much did OEE increase in %...",
          "LEAD_TIME":"Lead Time (HRS)",
          "LEAD_TIME_HOURS":"Lead Time in hours...",
        }

        //
    
      },
    
      es: {
    
        translation: {
   
          "SUBMIT_IDEA": "Someter Idea",

          "BACK": "Regresar",
   
          "SUBMIT_IDEA_Sub": "Somete información y detalles de la IDEA.",

          "IDEA_INFO": "Información de IDEA",
   
          "SUBMIT_IDEA_Proponent": "Proponente",
   
          "SUBMIT_IDEA_Department": "Departmento",
          "SUBMIT_IDEA_Department_Benefitted": "Departamento Beneficiado",
   
          "SUBMIT_IDEA_Team": "Equipo",
   
          "SUBMIT_IDEA_TeamPlaceholder": "Nombre del Equipo",
   
          "SUBMIT_IDEA_DepartmentSelect": "Seleccionar un departamento",
   
          "SUBMIT_IDEA_Date": "Fecha",
   
          "RESET_PASSWORD":"Cambiar contraseña",

          "HELP":"Ayuda",

          "TITLE":"Título",

          "DESCRIPTION":"Descripción",

          "FILE":"Archivo",

          "VIEW_FILE":"Ver Archivo",

          "CATEGORY_INFORMATION":"Información de Categoría",

          "BASIC_INFORMATION":"Información Básica",

          "LOGOUT":"Salir",

          "IDEA_COMPLETADA":  "IDEA COMPLETADA",

          "IDEA_COMPLETADA_MESSAGE": "Somete los resultados reales de la IDEA.",

          "EVALUATION":"Evaluación",

          "COMMENTS":"Comentarios",

          "RESPONSABILITY":"Responsabilidad",

          "IMPORT_QUESTIONS": "Importar Preguntas",

          "RESET_IDEAS":"Reiniciar Ideas",

          "WRITE_COMMENTS":"Escribir Comentarios",

          "ASSIGN_RESPONSIBLE_EXECUTION":"Asignar responsable para ejecución",

          "ASSIGN_COACH":"Asignar Coach",

          "RESPONSIBLE_NAME":"Nombre del Responsable",

          "PHOTOS_BEFORE_AFTER":"Fotos (Antes y Después)",

          "SUBMIT_BEFORE_AFTER": "Sube fotos de antes y después.",

          "MEJORAS_IMPLANTADAS": "Mejoras Implementadas",

          "RESULTS": "Resultados",

          "BEFORE": "Antes",

          "AFTER": "Después",

          "SUBMIT_IDEA_Category": "Categoría",
   
          "SUBMIT_IDEA_IdeaTitle": "Título de Idea",

          "IMPORT_CATS_DEPTS": "Importar Categorias and Departmentos",
   
          "SUBMIT_IDEA_TitlePlaceholder": "Título corto...",
   
          "SUBMIT_IDEA_IdeaDescription": "Descripción de Idea",
   
          "SUBMIT_IDEA_DescriptionPlaceholder": "Descripción...",
   
          "SUBMIT_IDEA_UploadArchive": "Subir Archivo",
   
          "SUBMIT_IDEA_RemainingCharacters": " caracteres restantes",
   
          "ADMINISTRATION_TITLE": "ADMINISTRACION",
   
          "Administration_SUBTITLE": "CONFIGURACION Y",
   
          "TEAM":"Equipo",
   
          // Administration
   
          "ADMINISTRATION_TITLE": "ADMINISTRACION",
   
          "ADMINISTRATION_SUBTITLE": "CONFIGURACION Y",
   
          // Evaluation committee
   
          "IDEA_VERIFICATION":"Verificar Idea",
   
          "EVAL_COMMITTEE_NEW": "Nuevo Comité Evaluador",
   
          "EVAL_COMMITTEE": "Comité Evaluador",
   
          "EVAL_COMMITTEE_PLACEHOLDER": "Nombre del Comité Evaludor",
   
          "EVAL_COMMITTEE_MEMBER": "Miembros",
   
          "EVAL_COMMITTEE_EMAIL_PLACEHOLDER": "Email",
   
          "EVAL_COMMITTEE_NAME_PLACEHOLDER": "Nombre Completo",

          "CHOOSE_FILE":"Seleccione archivo...",

          "IDEA_INNOVATION":"¿Es una idea de innovación?",
   
          "IDEA_PROBLEM":"¿Soluciona un problema?",

          "EVAL_COMMITTEE_MEMBER_BTN": "Añadir miembros",
   
          "EVAL_COMMITTEE_TYPE_TITLE": "Este comité evaluará por: ",
   
          "EVAL_COMMITTEE_AREA": "Area de Responsabilidad",
   
          "EVAL_COMMITTEE_CLASSIFICATION": "Clasificación de la Idea",

          "EVAL_COMMITTEE_MANAGE": "Management",
   
          "EVAL_COMMITTEE_CREATE_BTN": "Crear Comité",
   
          "EVAL_COMMITTEE_DEPARTMENT": "Departmento",
   
          "EVAL_COMMITTEE_CATEGORY": "Categoría",
   
          "EVAL_COMMITTEES": "Comités de Evaluación",
   
          "SAFETY_CATEGORY":"Seguridad",
   
          "QUALITY_CATEGORY":"Calidad",
   
          "IMMEDIATEACTION_CATEGORY":"Acción Inmediata",
   
          "PRODUCTIVITY_CATEGORY":"Productividad",
   
          "SELECT_MEMBERS":"Seleccionar Miembros",
   
          "SUBMIT_IDEA_REQUIRED_QUESTION": "*Esta pregunta es requerida",
   
          "ANSWER":"Contestar...",
   
          "CONTINUE":"Continuar",
   
          "SUBMIT":"Someter",
   
          "SEARCH":"Buscar",
   
          "IDEA_UPDATE_TITLE":"Actualizar Idea",
   
          "ENTRIES":"Entradas",
   
          "HISTORY":"Historial",
   
          "DEPARTMENTS": "DEPARTMENTOS",
   
          // Evaluation committee – Comité Evaluador
   
          "EVAL_COMMITTEE_NEW": "Nuevo Comité Evaluador",
   
           // MENU
   
           "MENU_IDEA":"Idea",
   
           "MENU_SUBMIT_IDEA":"Someter Idea",
   
           "MENU_SEARCH_IDEA":"Buscar Idea",
   
           "MENU_MANAGE_IDEA":"Manejar Ideas",
   
           "MENU_IDEA_VERIFICATION":"Verificar ideas",
   
           "MENU_RECOGNITION":"Reconocimiento y recompensas",
   
           "MENU_REPORTS":"Reportes",
   
           "MENU_ADMINISTRATION":"Administración",
   
           "MENU_INCOMING_IDEAS":"Ideas Entrantes",
   
           "MENU_INCOMING_RECOGNITION":"Reconocimientos Entrantes",
   
           "MENU_HISTORY":"Historial",

           "MENU_CATS_DEPTS": "Categorias/Departmentos",

          "MENU_USERS": "Usuarios",

          "MENU_COMITES": "Comites",

          "MENU_QUESTIONS": "Preguntas",
   
           // REPORTS
   
          "REPORTS": "Reportes",
   
          "VIEW_REPORTS": "Ver Reportes",
   
          "SUBMITTED_IDEAS": "Ideas Sometidas",
   
          "COMPLETED_IDEAS": "Ideas Completadas",
   
          "IDEAS_ON_PROGRESS": "Ideas en Progreso",
   
          "PENDING_FOR_EVALUATION": "Evaluación Pendiente",
   
          "IDEAS_BY_DEPARTMENT": "Ideas por Departmento",
   
          "PROGRESS_BY_CATEGORY": "Progreso por Categoría",
   
          // CONFIGURATION AND ADMINISTRATION
   
          "CONFIGURATION_AND": "CONFIGURACION Y",
   
          "ADMINISTRATION": "ADMINISTRACION",
   
          "NEW_EVAL_COMMITTEE": "Nuevo Comité Evaluador",
   
          "EVAL_COMMITTEE_NAME": "Nombre Comité Evaluador",
   
          "EVAL_COMMITTEE_MEMBERS": "Miembros",
   
          "EVAL_COMMITTEE_EMAIL": "Email",
   
          "EVAL_COMMITTEE_NAME": "Nombre Completo",
   
          "EVAL_COMMITTEE_ADD_MEMBERS": "Añadir miembros",
          "EVAL_COMMITTEE_ADD":"Add new members",
   
          "EVAL_COMMITTEE_EVALUATE_BY": "Este comité evaluará por: ",
   
          "EVAL_COMMITTEE_CREATE_COMMITTEE": "Crear Comité",
   
          "EVAL_COMMITTEE_AREA_RESPONSIBILITY": "Area de Responsabilidad",
   
          "EVAL_COMMITTEE_IDEA_CLASSIFICATION": "Clasificación de la Idea",

          "EVAL_COMMITTEE_MANAGE": "Manejo",
   
          "CATEGORIES": "CATEGORIAS",
   
          //SEARCH IDEA
   
          "IDEA_MANAGE_FILTERS":"Actualizar Idea",
   
          "IDEA_MANAGE_SUBTITLE":"IDEA",
   
          "IDEA_MANAGE_OPEN":"Abrir IDEA",
   
          "IDEA_MANAGE_NUM":"Número de Idea",
   
          "IDEA_MANAGE_TITLE":"Título",
   
          "IDEA_MANAGE_CAT":"Categoría",
   
          "IDEA_MANAGE_CATS":"Categorias",
   
          "IDEA_MANAGE_FILTERS":"Filtros",
   
          "IDEA_MANAGE_TYPES":"Tipos de Idea",
   
          "IDEA_MANAGE_PROG":"Progreso",
   
          "IDEA_MANAGE_PROP":"Proponente",
   
          "IDEA_MANAGE_STATUS":"Status",
   
          "IDEA_MANAGE_EVALUATE":"Evaluar",

          "IDEA_UPDATE_VIEW":"Ver / Editar",
          "SHOW":"VER",
    

          // EVALUATION
          "IDEA_VERIFICATION":"Verificar Idea",

          "EVAL_IDEA_TITLE":"Evaluar IDEA",

          "EVAL_IDEA_TITLE_PROJECT":"Evaluar PROYECTO",

          "EVAL_IDEA_VERIFICATION":"Verificación",
          "ROWS":"FILAS",

          "EVAL_IDEA_BENEFITS":"Se obtuvo el resultado financiero esperado",

          "EVAL_IDEA_IMPROVEMENT":"IDEA mejoró el proceso o etapa del proceso",

          "EVAL_IDEA_FINRES":"Resultado financiero",

          "EVAL_IDEA_IMPACT":"Se impactaron otras áreas del proceso o se replicó",

          "EVAL_IDEA_RECOG":"Esta IDEA lleva reconocimiento",

          "EVAL_IDEA_YES":"Si",

          "EVAL_IDEA_NO":"No",

          "EVAL_IDEA_BUTTON":"Someter Verificación",

          // EVALUATION
          "RECOG_IDEA_TITLE":"Crear Reconocimiento",

          "RECOG_IDEA_RECOGNITION":"Reconocimiento",

          "RECOG_IDEA_EMPLOYEES":"Reconocer Empleados",

          "RECOG_IDEA_DATE":"Fecha de Reconocimiento",

          "RECOG_IDEA_TYPE":"Tipo de Reconocimiento",

          "RECOG_IDEA_POINTS":"Recompensa",

          "RECOG_IDEA_LOW":"Bajo",
          "RECOG_IDEA_MODERATE":"Mediano",
          "RECOG_IDEA_HIGH":"Alto",
   
          // MANAGE IDEA ENTRANTE
   
          "IDEA_MANAGE_TITLE":"Manejar Idea",
   
          "IDEA_MANAGE_SUBTITLE":"IDEA",
   
          "IDEA_MANAGE_OVERVIEW":"Información de Idea",
   
          "IDEA_MANAGE_PROPONENT":"Proponente",
   
          "IDEA_MANAGE_SUBMITTED":"Sometida",
   
          "IDEA_MANAGE_DEPARTMENT":"Departmento",
   
          "IDEA_MANAGE_CATEGORY":"Categoría",
   
          "IDEA_MANAGE_ASSIGNED":"Asignada a",
   
          "IDEA_MANAGE_STATUS":"Estatus Actual",
   
          "IDEA_MANAGE_PROGRESS":"Progreso Actual",

         "IDEA_EVALUATED_ASSIGNED":"Idea evaluada y asignada",

         "IDEA_EXECUTION_STARTED":"Comenzó ejecucion",

         "IDEA_IMPLEMENTED":"Implantada",

         "IDEA_IMPLEMENTED_BENEFITS":"Implantada con beneficios",

         "WRITE_NEW_COMMENT":"Escribe un comentario",

         "WRITE_NEW_COMMENT_DESCRIPTION":"Escribe comentario pertinente sobre la idea",
   
          "IDEA_MANAGE_ADD_PROGRESS":"Actualizar Progreso",
   
          "IDEA_MANAGE_BTN_HOLD":"Pausar Idea",
   
          "IDEA_MANAGE_BTN_UPDATE":"Actualizar Idea",
   
          // HISTORY
   
          "TRANSACTION_HISTORY": "Historial de Transacciones",
   
          "TRANSACTION_DESCRIPTION": "Descripción",
   
          "TRANSACTION_CATEGORY": "Categoría",
   
          "TRANSACTION_PROPONENT":"Proponente",
   
          "TRANSACTION_STATUS": "Status",
   
          "TRANSACTION_ACTIONS":"Acciones",
   
          "TRANSACTION_EVALUATED": "Ideas Evaluadas",
   
          "TRANSACTION_MANAGE":"Manejo de Ideas",
   
          "TRANSACTION_VERIFIED":"Ideas Verificadas",
   
          "TRANSACTION_RECOGNITION":"RECONOCIMIENTOS Y RECOMPENSAS",
   
          "TRANSACTION_VIEWRECOGNITION":"VER RECONOCIMIENTOS",
   
          "TRANSACTION_EMPLOYEE_NAME":"Nombre del Empleado",
   
          "TRANSACTION_EMPLOYEE_NUM":"Número de Empleado",
   
          "TRANSACTION_RECOGNITION_TYPE":"Tipo",
   
          "TRANSACTION_EMPLOYEE_POINTS":"Puntos",
   
          'NUMBER_MEMBERS':"Número de Miembros: ",
   
          'EVALUATING_BY':"Evaluando por: ",
   
          'ENGLISH':"Inglés",
   
          'SPANISH':"Español",
   
          // New Question
   
          "NEW_QUESTION": "Nueva Pregunta",
   
          "QUESTION_ENGLISH": "Pregunta (Inglés)",
   
          "QUESTION_SPANISH": "Pregunta (Español)",

          "QUESTION_OPEN": "Pregunta Abierta (Campo)",
   
          "QUESTION_PLACEHOLDER": "Escriba la pregunta en inglés aquí..",

          "QUESTION_PLACEHOLDER_SPANISH": "Escriba la pregunta en español aquí..",
   
          "QUESTION_CATEGORY": "Categoría",
   
          "QUESTION_REQUIRED": "Pregunta Requerida",
   
          "QUESTION_BTN": "Someter Pregunta",
   
          // Question list
   
          "QUESTION_LIST": "Lista de Preguntas",
   
          "QUESTION": "Pregunta",
   
          "CATEGORY": "Categoría",
   
          "STATUS": "Status",
   
          "ACTIONS": "Acciones",
   
           // EVALUATION
          "IDEA_VERIFICATION":"Verificar Idea",
   
           "EVALUATE_IDEA":"Evaluar IDEA",
   
           "REVIEW_IDEA":"Repasar IDEA",
   
           "EVALUATION_IDEA":"Evaluación",
   
           "NEEDS_INFO_IDEA":"IDEA necesita más información",

           "NEEDS_INFO_PROJECT":"Proyecto necesita más información",
   
           "HOLD_IDEA":"IDEA en Pausa",

           "HOLD_PROJECT":"Proyecto en Pausa",
   
           "NOT_PURSUED_IDEA":"No Perseguida",

           "NOT_PURSUED_PROJECT":"No Perseguida",
   
           "JUST_DO_IDEA":"Just Do It",

           "JUST_DO_PROJECT":"Just Do It Proyecto",
   
           "PROYECT_IDEA":"IDEA Proyecto",
   
           "OTHER_COMMITTEE_IDEA":"Otro Comité",
   
           "COMMENTS_IDEA":"Comentarios",
   
           "WRITE_COMMENTS_IDEA":"Escribir comentarios",
   
           "ASSIGN_RESPONSIBLE_IDEA":"Asignar responsable",
   
           "RESPONSIBLE_NAME_IDEA":"Nombre del Responsable",
   
           "ASSIGN_COACH_IDEA":"Asignar Coach",
   
           "RESET": "Reiniciar",
   
           "RESET_MSG": "Se borrarán todas las ideas. ¿Desea proceder?",

           "USER_LIST": "Lista de Usuarios",

          "ENTER_NAME":"Nombre",

          "FIRST_NAME_PLACEHOLDER":"Primer Nombre",
   
          "LAST_NAME_PLACEHOLDER":"Apellido",

          "EMAIL":"Email",

          "USERID":"Userid",
          "USERID_PLACEHOLDER":"Entre su Userid",

          "EMAIL_PLACEHOLDER":"jose.feli@lasalle-group.com",

          "USER_TYPE":"Rol",

          "ADD_USER_BTN": "Añadir Usuario",

          "ENTER_LAST_NAME":"Apellido",
         
          "NEW_USER": "Nuevo Usuario",

          // Reports
          "IDEAS_BY_PROGRESS":"Ideas por Estatus",

          "EXPECTED_EARNINGS_BY_CATEGORY": "Ganancias Proyectadas por Categoría",

          "ACTUAL_EARNINGS_BY_CATEGORY": "Ganancias Reales por Categoría",



          "DOWNLOAD_DATA": "Descargar Datos",

          // Filters
          "FILTER_INNOVATION": "Innovación",
          "FILTER_PROBLEM_F": "Problema",
          "FILTER_ALL": "Todas",
          "FILTER_SUBMITTED": "Sometidas",
          "FILTER_DONE": "Completadas",

          // Return
          "SUBMIT_IDEA_ReturnTitle":"Ahorros Esperados (Mensual)",
          "SUBMIT_IDEA_ReturnPlaceholder":"E.j. 1000",

          "DELETE_FILE": "Borrar Archivo",
          "SUBMIT_IDEA_Money":"Solo se acceptan numeros. Evite comas u otros caracteres invalidos.",
          "COULD_BE_REPLICATED":"Puede replicarse en otras areas o plantas?",
          "SAVINGS_IN_LABOR":"Ahorros en labor (hrs)",
          "NUMBER_HOURS_SAVED":"Numero de horas ahorradas...",
          "COST":"Costo (USD)",
          "COST_SAVED":"Cuanto dinero se ahorro...",
          "INVENTORY":"Inventario (USD)",
          "INVENTORY_DESC":"Inventario...",
          "OEE_INCREASE":"OEE (Aumento %)",
          "OEE_INCREASE_MUCH":"Por cuanto aumento el OEE en %...",
          "LEAD_TIME":"Lead Time (HRS)",
          "LEAD_TIME_HOURS":"Lead Time en horas...",
        }
        }
    },
    lng: lng,
    fallbackLng: "en",
});



ReactDOM.render(
<I18nextProvider i18n={i18next}>
    <App />
</I18nextProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
