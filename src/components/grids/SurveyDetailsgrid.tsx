import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import React, { useRef } from "react";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import Spinner from "../spinner/Spinner";
import { AppDispatch } from "../../store/Store";
import { useDispatch } from "react-redux";
import {
  deleteQuestion,
  getSurveyDetails,
} from "../../store/slice/SurveyDetails";
import { useNavigate } from "react-router-dom";

const SurveyDetailsGrid = () => {
  const surveyDetails = useSelector((state: any) => state.surveyDetails);
  const generateSerialNumber = (index: number) => {
    return index + 1;
  };
  const toast = useRef<Toast>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const navigateToEdit = (rowData:any) =>{
    navigate(`/surveyDetails/${rowData.surveyid}/multiselect/${rowData.questionid}`)
  }
  const confirm = (row: any) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: async () => {
        await dispatch(deleteQuestion(row.questionid));
        if (!surveyDetails.dError) {
          await dispatch(getSurveyDetails());
        }
      },
    });
  };

  const editTemplate = (rowData: any) => {
    return (
      <div className="flex gap-3 justify-content-center">
        <FiEdit 
          className="cursor-pointer	text-teal-600	text-base text-lg" 
          onClick={() => navigateToEdit(rowData)}
        />
        <RiDeleteBinLine
          className="cursor-pointer text-red-500	text-lg"
          onClick={() => confirm(rowData)}
        />
      </div>
    );
  };

  const Grid = () => {
    return (
      <div className="card px-3">
        {surveyDetails.dLoading && <Spinner />}
        <ConfirmDialog />
        <DataTable
          value={surveyDetails.details.result}
          removableSort
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="serial"
            header="Serial"
            sortable
            style={{ width: "5%" }}
            body={(rowData, column) => generateSerialNumber(column.rowIndex)}
          ></Column>
          <Column
            field="surveyname"
            header="surveyname"
            sortable
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="question"
            header="Question"
            sortable
            style={{ width: "60%" }}
          ></Column>
          <Column
            field="questiontype"
            header="Type"
            sortable
            style={{ width: "15%" }}
          ></Column>
          <Column
            field="actions"
            header="Actions"
            body={(rowData) => editTemplate(rowData)}
            sortable
            style={{ width: "10%" }}
          ></Column>
        </DataTable>
      </div>
    );
  };

  return (
    <div className="parent">
      {surveyDetails.error && 'Unable to process the request'}
      {surveyDetails.loading ? <Spinner /> : <Grid />}
    </div>
  );
};

export default SurveyDetailsGrid;
