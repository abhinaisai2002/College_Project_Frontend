import axios from 'axios';
import React, { useRef, useState } from 'react'
import Button from '../../../components/UI/button/Button';
import { Input } from '../../../components/UI/input/Input';
import {
  useGetAllSemsForStudentQuery,
} from "../../../redux/reducers/teacherSlice";
import Test from './Test';

export default function Consolidations() {

  const [rollNo, setRollNo] = useState('');
  
  const [skip, setSkip] = useState(true);

  const { isLoading, error, data,refetch } = useGetAllSemsForStudentQuery({
    'roll_no': rollNo
  },
  {
    skip,
  }
  );

  const handleConsolidationSubmit = function (event) {
    event.preventDefault();
    setSkip(false);
    refetch();
  }

  console.log(data);

  const submitRef = useRef();

  return (
    <div style={{ color: "white" }}>
      <header>
        <div className="header__left"></div>
        <div className="header__right">
          <Button
            style={{ margin: "0px 10px" }}
            text="See"
            onClick={() => {
              submitRef.current.click();
            }}
          />
        </div>
      </header>
      <div
        style={{
          color: "white",
          margin: "10px",
          borderBottom: "5px solid white",
        }}
      >
        <h1>See Consolidation of</h1>
      </div>
      <div>
        <form onSubmit={handleConsolidationSubmit}>
          <Input
            name="roll_no"
            label="Enter Roll No"
            value={rollNo}
            onChange={(e) => {
              setSkip(true)
              setRollNo(e.target.value)
            }}
            required
          />
          <button style={{display:'none'}} type='submit' ref={submitRef}>Submit</button>
        </form>
      </div>
      <div>
        {data && data.success==='1' && <Test data={data.data} rollNo={rollNo} />}
      </div>
    </div>
  );
}
