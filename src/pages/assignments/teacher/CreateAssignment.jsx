import React, { useRef, useState, useContext } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/UI/button/Button";
import { Input, RadioInput, Select } from "../../../components/UI/input/Input";
import { ThemeContext } from "../../../contexts/ThemeContext";
import {
  useCreateAssignmentMutation,
  useGetBranchesByYearQuery,
  useGetSectionsByBranchYearQuery,
  useGetSubjectByBranchYearSectionSemQuery,
} from "../../../redux/reducers/teacherSlice";

const dates = {
  0: "01",
  1: "02",
  2: "03",
  3: "04",
  4: "05",
  5: "06",
  6: "07",
  7: "08",
  8: "09",
  9: "10",
  10: "11",
  11: "12",
};

const initialState = {
  title: "",
  due_date: "",
  date: "",
  year: "",
  branch: "",
  section: "",
  semester: "",
  subject: "",
  file: null,
};

const CreateAssignment = () => {
  const submitBtnRef = useRef(null);

  const { theme } = useContext(ThemeContext);

  const [teacherFormData, setTeacherFormData] = useState(initialState);

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
    { skip: branchSkip?.skip }
  );

  const { data: sectionsResponse } = useGetSectionsByBranchYearQuery(
    {
      year: teacherFormData?.year,
      branch: sectionsSkip?.branch,
    },
    { skip: sectionsSkip?.skip }
  );

  const { data: subjectsResponse } = useGetSubjectByBranchYearSectionSemQuery(
    {
      year: teacherFormData?.year,
      branch: teacherFormData?.branch,
      semester: subjectsSkip?.semester,
      section: teacherFormData?.section,
    },
    { skip: subjectsSkip?.skip }
  );

  const [createAssignment] = useCreateAssignmentMutation();

  const onHandleChange = (e) => {
    let { name, value } = e.target;

    switch (name) {
      case "year":
        value = parseInt(value);
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
        value = parseInt(value);
        setSubjectsSkip({ skip: false, semester: value });
        value === "" &&
          setTeacherFormData((prev) => ({
            ...prev,
            semester: value,
            subject: "",
          }));
        break;
      case "file":
        value = e.target.files[0];
        break;
      default:
        break;
    }

    setTeacherFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onCreateAssignmentSubmitHandler = (e) => {
    e.preventDefault();

    let data = { ...teacherFormData };

    let date = Date();

    data["date"] = date.split(" ").slice(0, 6).join(" ");

    let tdueDateList = data?.due_date;

    let tdueDate = new Date(
      // tdueDateList[0] + "-" + tdueDateList[1] + "-" + tdueDateList[2]
      data?.due_date
    );
    data["due_date"] = tdueDate.toString().split(" ").slice(0, 6).join(" ");

    const fd = new FormData();

    console.log("DATA", data);

    Object.entries(data).forEach(([key, value]) => fd.append(key, value));

    createAssignment(fd).then((res) => {
      if (res.data.success == 1) {
        setTeacherFormData(initialState);
        toast.success("Created successfully");
      }
    });
  };

  console.log(teacherFormData);

  return (
    <>
      {/* <header>
        <div className="header__left">
          <h1>Create Assignment</h1>
        </div>
      </header> */}
      <section className={`dashboard ${theme}`}>
        <div className={`teacher_filter__form ${theme}`}>
          <form
            style={{ maxWidth: "20rem !important" }}
            onSubmit={onCreateAssignmentSubmitHandler}
          >
            <div className="wrapper">
              <Input
                name="title"
                label="Title"
                value={teacherFormData?.title}
                onChange={onHandleChange}
                required
              />

              <Input
                type="date"
                name="due_date"
                label="Due Date"
                min={(() => {
                  let d = new Date();
                  return (
                    d.getFullYear() +
                    "-" +
                    dates[d.getMonth()] +
                    "-" +
                    d.getUTCDate()
                  );
                })()}
                value={teacherFormData?.due_date}
                onChange={onHandleChange}
                required
              />

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
                  required
                />
              )}
              {teacherFormData?.semester !== "" && (
                <Select
                  label="Subject"
                  name="subject"
                  value={teacherFormData?.subject}
                  onChange={onHandleChange}
                  optionInitialValue=""
                  // options={["ML", "UML", "IOT", "BDA", "CNS"]}
                  optionKey={"subject"}
                  optionValue={"subject"}
                  options={subjectsResponse?.data}
                  required
                />
              )}

              {teacherFormData?.subject !== "" && (
                <Input
                  name="file"
                  label="Attachment"
                  type="file"
                  accept=".pdf"
                  onChange={onHandleChange}
                  required
                />
              )}
            </div>

            <button
              type="submit"
              style={{ display: "none" }}
              ref={submitBtnRef}
            />
          </form>
        </div>
      </section>
      <footer>
        <div className="footer__left"></div>
        <div className="footer__right">
          <Button
            text="Create Assignment"
            onClick={() => submitBtnRef.current.click()}
          />
        </div>
      </footer>
    </>
  );
};

export default CreateAssignment;
