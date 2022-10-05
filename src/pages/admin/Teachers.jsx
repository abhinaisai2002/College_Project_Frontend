import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Input } from "../../components/UI/input/Input";
import "../../styles/Teachers.scss";

const DUMMY_TEACHERS = [
  {
    id: 1,
    name: "N Praveen Kumar",
    department: "CSE",
    job_title: "Associate Professor",
    mail: "praveen@gmail.com",
    phone: "8523490246",
  },
  {
    id: 2,
    name: "Putta Abhinai Sai",
    department: "CSE",
    job_title: "Professor",
    mail: "abhinaisai@gmail.com",
    phone: "6782348792",
  },
  {
    id: 3,
    name: "Hemanth VMK",
    department: "CSE",
    job_title: "HOD",
    mail: "hemujunior@gmail.com",
    phone: "8923748367",
  },
  {
    id: 4,
    name: "Jinna",
    department: "CSE",
    job_title: "Assistant Professor",
    mail: "jinnamanchu@gmail.com",
    phone: "7898394389",
  },
];

const TeachersTable = ({ teachersData }) => {
  const [data, setData] = useState(null);
  const user = useSelector(state => state.auth);

  useEffect(() => {
    setData(
      teachersData.map((teacher) => {
        return {
          ...teacher,
          value: teacher.name.split(" ").join("_"),
          isChecked: false,
          approved:false
        };
      })
    );
  }, [teachersData]);

  const handleAllCheckHandler = (e) => {
    setData((prev) =>
      prev.map((teacher) => {
        return {
          ...teacher,
          isChecked: e.target.checked,
        };
      })
    );
  };

  const handleCheckChildElement = (e) => {
    setData((prev) =>
      prev.map((teacher) => {
        return {
          ...teacher,
          isChecked:
            teacher.value === e.target.value
              ? e.target.checked
              : teacher.isChecked,
        };
      })
    );
  };

  const handleApprove= async (id)=>{

    const sendReq = async () => {
      const response = await axios.post("URL",{id},{
        headers:{
          'Content-Type':'applications/json',
          'Authorization':`Bearer ${user.access}`
        }
      })
    }  

    try{
      await sendReq();
    }
    catch(err){
      console.log(err);
    }
    const dummyData = [...data];
    const dummyTeacherIndex = dummyData.findIndex(teacher => teacher.id === id);
    const dummyTeacher = dummyData[dummyTeacherIndex];
    dummyTeacher.approved = true;
    dummyData[dummyTeacherIndex] = dummyTeacher;
    setData(p=>dummyData);

  }

  const handleDissapprove = async (id)=>{

    const sendReq = async () => {
      const response = await axios.post("URL",{id},{
        headers:{
          'Content-Type':'applications/json',
          'Authorization':`Bearer ${user.access}`
        }
      })
    }  


    try{
      await sendReq();
    }
    catch(err){
      console.log(err);
    }
    
    const dummyData = [...data];
    const dummyTeacherIndex = dummyData.findIndex(teacher => teacher.id === id);
    const dummyTeacher = dummyData[dummyTeacherIndex];
    dummyTeacher.approved = false;
    dummyData[dummyTeacherIndex] = dummyTeacher;
    setData(p=>dummyData);
  }

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              value="checkedAll"
              onChange={handleAllCheckHandler}
            />
          </th>
          {["name", "department", "job title", "mail", "phone"].map(
            (header) => (
              <th key={header}>{header.toUpperCase()}</th>
            )
          )}
          <th>
            <Button title="Approve All" className="btn-success"/>
          </th>
          <th>
            <Button title="Disapprove All" className="btn-danger" />
          </th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((teacher) => (
            <tr key={teacher.id}>
              <td>
                <input
                  type="checkbox"
                  checked={teacher.isChecked}
                  onChange={handleCheckChildElement}
                  value={teacher.value}
                />
              </td>
              <td>{teacher.name}</td>
              <td>{teacher.department}</td>
              <td>{teacher.job_title}</td>
              <td>{teacher.mail}</td>
              <td>{teacher.phone}</td>
              <td>
                <Button
                  title={`${teacher.approved? 'approved':'approve'}`}
                  className={`${teacher.approved? 'btn-success':'btn-danger'}`}
                  disabled={teacher.isChecked}
                  onClick={()=>handleApprove(teacher.id)}
                />
              </td>
              <td>
                <Button
                  title="Disapprove"
                  className="btn-danger"
                  disabled={teacher.isChecked}
                  onClick={()=>handleDissapprove(teacher.id)}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

const Button = ({ title, className, ...otherprops }) => {
  return (
    <button className={`table__button ${className}`} {...otherprops}>
      {title}
    </button>
  );
};

const Teachers = () => {

  const [phone,setPhone] = useState('');
  const [teachers,setTeachers] = useState([]);
  const [realTeachers,setRealTeachers] = useState([]);

  useEffect( ()=>{
    //get teachers from api
    setTeachers(p=>DUMMY_TEACHERS);
    setRealTeachers( p => DUMMY_TEACHERS);
  }, [] );

  useEffect( ()=>{
    if(phone!=''){
      let dummyTeachers = [...teachers];
      dummyTeachers = realTeachers.filter((teacher)=> teacher.phone.startsWith(phone));
      setTeachers(p=>dummyTeachers);
    }
    else{
      setTeachers(realTeachers);
    }

  },[realTeachers,phone])

  const handlePhoneChange = (event)=>{
    setPhone(p => event.target.value);
  }

  return (
    <>
      <div className="teachers_page__wrapper">
        <header>
          <h1>
            Teachers <span>Approval/Disapproval</span>
          </h1>
          <span className="text-white">
            <div>
              <Input 
                type="phone" 
                placeholder="Search by phone."
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>
          </span>
        </header>
        <main>
          <TeachersTable teachersData={teachers} />
        </main>
      </div>
    </>
  );
};

export default Teachers;


