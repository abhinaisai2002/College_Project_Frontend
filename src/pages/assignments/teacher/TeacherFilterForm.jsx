import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/UI/button/Button";

import { RadioInput, Select } from "../../../components/UI/input/Input";
import ModalComponent from "../../../components/UI/modal/ModalComponent";
import { ThemeContext } from "../../../contexts/ThemeContext";
import {
  useGetAssignmentsByTeacherQuery,
  useGetBranchesByYearQuery,
  useGetSectionsByBranchYearQuery,
  useGetSubjectByBranchYearSectionSemQuery,
} from "../../../redux/reducers/teacherSlice";

import "../student/Assignments.scss";
import "./TeacherAssignments.scss";

const DUMMY_ASSIGNMENTS = {
  title3: {
    id: 1,
    due_date: "2022-11-07T23:11:26Z",
    creation_data: "2022-11-05T23:11:26Z",
    subject: "Subj1",
    subject_code: "S1",
    subject_color: "#36454F",
    question_link:
      "https://firebasestorage.googleapis.com/v0/b/clg-proj-5d15e.appspot.com/o/assignments%2Ftitle31667706274364792013?alt=media&token=2",
    assignment_title: "title3",
  },
  assignment: {
    id: 3,
    due_date: "2023-01-19T11:00:00Z",
    creation_data: "2023-01-17T03:18:47Z",
    subject: "Subj1",
    subject_code: "S1",
    subject_color: "#36454F",
    question_link:
      "https://firebasestorage.googleapis.com/v0/b/clg-proj-5d15e.appspot.com/o/assignments_questions%2Fassignment1673885927893778958?alt=media&token=2",
    assignment_title: "assignment",
  },
};

const TeacherFilterForm = ({ subjectColors, assignments }) => {
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);

  const [subjectAssignments, setSubjectAssignments] = useState(assignments);
  const [realSubjectAssignments, setRealSubjectAssignments] =
    useState(subjectAssignments);
  const [query, setQuery] = useState("");

  const [showAssignments, setShowAssignments] = useState(false);

  const [teacherFormData, setTeacherFormData] = useState({
    year: "",
    branch: "",
    section: "",
    semester: "",
    subject: "",
  });

  const [getAssignmentsSkip, setGetAssignmentsSkip] = useState(true);
  const [branchSkip, setBranchSkip] = useState({ skip: true, year: null });
  const [subjectsSkip, setSubjectsSkip] = useState({
    skip: true,
    semester: null,
  });
  const [sectionsSkip, setSectionsSkip] = useState({
    skip: true,
    branch: null,
  });

  const { data: branchesResponse } = useGetBranchesByYearQuery(
    {
      year: branchSkip?.year,
    },
    { skip: branchSkip?.skip , refetchOnMountOrArgChange:true}
  );

  const { data: sectionsResponse } = useGetSectionsByBranchYearQuery(
    {
      year: teacherFormData?.year,
      branch: sectionsSkip?.branch,
    },
    { skip: sectionsSkip?.skip, refetchOnMountOrArgChange: true }
  );

  const { data: subjectsResponse } = useGetSubjectByBranchYearSectionSemQuery(
    {
      year: teacherFormData?.year,
      branch: teacherFormData?.branch,
      semester: subjectsSkip?.semester,
      section: teacherFormData?.section,
    },
    { skip: subjectsSkip?.skip, refetchOnMountOrArgChange: true }
  );

  const { data: assignmentsResponse } = useGetAssignmentsByTeacherQuery(
    teacherFormData,
    { skip: getAssignmentsSkip, refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (assignmentsResponse?.data) {
      setShowAssignments(true);
    }
  }, [assignmentsResponse]);

  useEffect(() => {
    if (query !== "") {
      const tempAssignments = realSubjectAssignments.filter((assignment) =>
        ["title", "subject_short_code"].some((key) =>
          assignment[key].toLowerCase().includes(query.toLowerCase())
        )
      );
      setSubjectAssignments((prev) => tempAssignments);
    } else setSubjectAssignments(realSubjectAssignments);
  }, [query]);

  const onSubjectClickHandler = (subject) => {
    const filteredAssignments = assignments?.filter(
      (assignment) => assignment.subject_short_code === subject
    );

    if (filteredAssignments) {
      setSubjectAssignments(filteredAssignments);
    }
  };

  const onSearchHandler = (e) => setQuery(e.target.value);

  const onHandleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "year":
        setBranchSkip({ skip: false, year: value });
        value === "" &&
          setTeacherFormData((prev) => ({
            ...prev,
            branch: "",
            section: "",
            subject: "",
            semester: "",
          }));

        break;
      case "branch":
        setSectionsSkip({ skip: false, branch: value });
        value === "" &&
          setTeacherFormData((prev) => ({
            ...prev,
            branch: value,
            section: "",
            subject: "",
            semester: "",
          }));

        break;
      case "semester":
        setSubjectsSkip({ skip: false, semester: value });
        value === "" &&
          setTeacherFormData((prev) => ({
            ...prev,
            semester: value,
            subject: "",
          }));
        break;
      default:
        break;
    }

    setTeacherFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log(teacherFormData);

  return (
    <>
      <ModalComponent
        size="lg"
        title="Assignments"
        show={showAssignments}
        handleClose={() => setShowAssignments(false)}
        body={
          <div className={`assignments__wrapper ${theme}`}>
            {Object.entries(DUMMY_ASSIGNMENTS)?.map(([title, data]) => (
              <div
                className="assignment__wrapper"
                style={{ background: "#414653 " }}
                onClick={() =>
                  navigate(
                    `/teacher-assignments/${teacherFormData?.year}/${teacherFormData?.branch}/${teacherFormData?.semester}/${teacherFormData?.section}/${teacherFormData?.subject}/${title}/${data?.id}`
                  )
                }
              >
                <div
                  className="assignment_subject_color_code"
                  style={{ background: data.subject_color }}
                />
                <div className="assignment_subject">{data?.subject_code}</div>
                <div className="assignment_body">
                  <span>{title}</span>
                  <span>{getDate(data?.creation_data)}</span>
                </div>
              </div>
            ))}
          </div>
        }
        footer={
          <>
            <div className="footer_left"></div>
            <Button text="Close" onClick={() => setShowAssignments(false)} />
          </>
        }
      />

      <section className={`dashboard ${theme}`}>
        <div className={`teacher_filter__form ${theme}`}>
          <form style={{ maxWidth: "20rem !important" }}>
            <div className="wrapper">
              <Select
                label="Batch"
                name="year"
                value={teacherFormData?.year}
                onChange={onHandleChange}
                optionInitialValue=""
                options={{ "1st": 1, "2nd": 2, "3rd": 3, "4th": 4 }}
                required
              />

              {teacherFormData?.year !== "" && (
                <Select
                  label="Branch"
                  name="branch"
                  value={teacherFormData?.branch}
                  onChange={onHandleChange}
                  optionInitialValue=""
                  // options={["CSE", "IT", "ECE", "EEE", "CIVIL", "MECH"]}
                  options={branchesResponse?.data}
                  required
                />
              )}

              {teacherFormData?.branch !== "" && (
                <RadioInput
                  label="Section"
                  name="section"
                  required
                  // radioInputs={[
                  //   { value: "A", label: "A" },
                  //   { value: "B", label: "B" },
                  //   { value: "C", label: "C" },
                  //   { value: "D", label: "D" },
                  // ]}
                  radioInputs={sectionsResponse?.data
                    ?.map((section) => {
                      return { value: section, label: section };
                    })
                    ?.sort((x, y) => x.value.localeCompare(y.value))}
                  handleChange={(val) =>
                    setTeacherFormData((prev) => ({ ...prev, section: val }))
                  }
                  checkedValue={teacherFormData?.section}
                />
              )}

              {teacherFormData?.section !== "" && (
                <Select
                  name="semester"
                  label="Semester"
                  value={teacherFormData?.semester}
                  onChange={onHandleChange}
                  options={{ "1st": 1, "2nd": 2 }}
                  optionInitialValue=""
                />
              )}
              {teacherFormData?.semester !== "" && (
                <>
                  <Select
                    label="Subject"
                    name="subject"
                    value={teacherFormData?.subject}
                    onChange={onHandleChange}
                    optionInitialValue=""
                    // options={["ML", "UML", "IOT", "BDA", "CNS"]}
                    optionKey={'subject'}
                    optionValue={'subject'}
                    options={subjectsResponse?.data}
                  />
                </>
              )}
            </div>
          </form>
        </div>
      </section>
      <footer>
        <div className="footer__left"></div>
        <div className="footer__right">
          <Button
            text="Get Assignments"
            onClick={() => {
              setGetAssignmentsSkip(false);

              //   todo: Comment this line after api is mapped
              setShowAssignments(true);
            }}
          />
        </div>
      </footer>
    </>
  );
};

export default TeacherFilterForm;

function getDate(dateS) {
  const date = new Date(dateS);
  const months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // let d = `
  // ${date.getFullYear()}/${
  //   months[date.getMonth()]
  // }/${date.getDate()} ${date.getHours()}:${date.getMinutes()} ${
  //   date.getHours() >= 12 ? "pm" : "am"
  // }
  //   `;

  let new_date = `${date?.getDate()}/${date?.getMonth()}/${date?.getFullYear()} ${date.getHours()}:${date.getMinutes()} ${
    date.getHours() >= 12 ? "pm" : "am"
  }`;

  return new_date;
}
